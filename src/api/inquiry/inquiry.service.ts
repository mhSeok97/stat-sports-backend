import { InquiryAnswerService } from "api/inquiry/answer/answer.service";
import { AnswerOutDto } from "api/inquiry/answer/dto/AnswerOut.dto";
import { CreateAnswerDto } from "api/inquiry/answer/dto/CreateAnswer.dto";
import { UpdateAnswerDto } from "api/inquiry/answer/dto/UpdateAnswer.dto";
import { InquiryAttachmentService } from "api/inquiry/attatchment/attachment.service";
import { AttachmentOutDto } from "api/inquiry/attatchment/dto/AttatchmentOut.dto";
import { InquiryCommentService } from "api/inquiry/comment/comment.service";
import { CommentOutDto } from "api/inquiry/comment/dto/CommentOut.dto";
import { CreateCommentDto } from "api/inquiry/comment/dto/CreateComment.dto";
import { UpdateCommentDto } from "api/inquiry/comment/dto/UpdateComment.dto";
import { CreateInquiryDto } from "api/inquiry/dto/CreateInquiry.dto";
import { InquirySearchParamDto } from "api/inquiry/dto/InquirySearchParam.dto";
import { InquiryOutDto } from "api/inquiry/dto/InquiryOut.dto";
import { InquiryStatus } from "api/inquiry/dto/InquiryStatus.dto";
import { UpdateInquiryDto } from "api/inquiry/dto/UpdateInquiry.dto";
import { Inquiry } from "api/inquiry/entity/inquiry.entity";
import { InquiryRepository } from "api/inquiry/repository/inquiry.repository";
import { IPayload } from "interfaces/payload.interface";
import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { AuthzChecker } from "utils/authzChecker";
import { AppDataSource } from "utils/mysql";
import { InquiryListOutDto } from "api/inquiry/dto/InquiryListOut.dto";
import { InfoToSendMail } from "interfaces/mail.interface";
import {
  sendAnswerCreationMail,
  sendCommentCreationMailToUser,
  sendCommentCreationToAdmin,
  sendInquiryCreationMailToAdmin,
} from "utils/mailSender";

@Service()
export class InquiryService {
  private readonly commentService = new InquiryCommentService();
  private readonly attachmentService = new InquiryAttachmentService();
  private readonly answerService = new InquiryAnswerService();

  private async findInquiryOrThrow(inquiryId: number): Promise<Inquiry> {
    const inquiry = await InquiryRepository.findExistingOneByInquiryId(inquiryId);
    if (!inquiry) {
      throw new NotFoundError(`Inquiry not found: inquiryId=${inquiryId}`);
    }
    return inquiry;
  }

  private async checkAuthzForPrivateInquiry(userInfo: IPayload, inquiry: Inquiry): Promise<void> {
    if (!inquiry.isPublic) {
      await AuthzChecker.checkAuthorization(userInfo, inquiry.userEmail);
    }
  }

  async createInquiry(userEmail: string, userName: string, dto: CreateInquiryDto, cookie: string): Promise<InquiryOutDto> {
    const newInquiry = await InquiryRepository.createInquiry(userEmail, userName, dto);
    const inquiryDto = this.convertInquiryToInquiryOutDto(newInquiry);

    if (dto.attachmentUUIDs?.length) {
      try {
        await this.attachmentService.moveTempFilesToInquiry(dto.attachmentUUIDs, newInquiry.inquiryId);
        const attachmentKeys = await this.attachmentService.getAttachmentKeys(newInquiry.inquiryId);
        const attachments = await this.attachmentService.getAttachmentDownloadURLs(newInquiry.inquiryId, attachmentKeys);
        inquiryDto.attachments = attachments;
      } catch (error) {
        throw new Error(`Failed to create inquiry: ${error.message}`);
      }
    }

    await sendInquiryCreationMailToAdmin(
      {
        title: newInquiry.title,
        content: newInquiry.content,
        ownerMail: userEmail,
        id: newInquiry.inquiryId,
      },
      cookie,
    );

    return inquiryDto;
  }

  async getInquiries(searchParmDto: InquirySearchParamDto): Promise<InquiryListOutDto> {
    if (searchParmDto.status && !InquiryStatus[searchParmDto.status]) {
      throw new Error(`Invalid status: ${searchParmDto.status}`);
    }

    const [inquiries, total] = await Promise.all([
      InquiryRepository.findExistingInquiriesByFilter(searchParmDto),
      InquiryRepository.countExistingInquiriesByFilter(searchParmDto),
    ]);

    return new InquiryListOutDto(inquiries.map(this.convertInquiryToInquiryOutDto), total);
  }

  async getInquiryDetail(userInfo: IPayload, inquiryId: number): Promise<InquiryOutDto> {
    const inquiry = await this.findInquiryOrThrow(inquiryId);
    await this.checkAuthzForPrivateInquiry(userInfo, inquiry);

    const inquiryDto = this.convertInquiryToInquiryOutDto(inquiry);
    try {
      const attachmentKeys = await this.attachmentService.getAttachmentKeys(inquiryId);
      const attachmentUrls = await this.attachmentService.getAttachmentDownloadURLs(inquiryId, attachmentKeys);
      inquiryDto.attachments = attachmentUrls;
    } catch (error) {
      throw new Error(`Failed to get attachments: ${error.message}`);
    }

    return inquiryDto;
  }

  async updateInquiry(userInfo: IPayload, id: number, dto: UpdateInquiryDto): Promise<void> {
    const existingInquiry = await this.findInquiryOrThrow(id);
    await AuthzChecker.checkAuthorization(userInfo, existingInquiry.userEmail);
    await this.attachmentService.handleUpdatedAttachments(existingInquiry.inquiryId, dto.attachmentKeys, dto.attachmentUUIDs);

    const result = await InquiryRepository.updateInquiry(id, dto);
    if (!result.affected) {
      throw new Error(`Failed to update inquiry id: ${id}`);
    }
  }

  async deleteInquiry(userInfo: IPayload, inquiryId: number): Promise<void> {
    const inquiry = await this.findInquiryOrThrow(inquiryId);
    await AuthzChecker.checkAuthorization(userInfo, inquiry.userEmail);

    const result = await InquiryRepository.updateDeleteFlagTrue(inquiryId);
    if (!result.affected) {
      throw new Error(`Failed to delete inquiry id: ${inquiryId}`);
    }
  }

  async createComment(userInfo: IPayload, inquiryId: number, dto: CreateCommentDto, cookie: string): Promise<CommentOutDto> {
    const inquiry = await this.findInquiryOrThrow(inquiryId);
    await AuthzChecker.checkAuthorization(userInfo, inquiry.userEmail);

    const newComment = await this.commentService.createComment(inquiry, userInfo.email, userInfo.EMPKORName, dto);
    const infoToSendMail: InfoToSendMail = {
      title: inquiry.title,
      content: dto.content,
      ownerMail: inquiry.userEmail,
      id: inquiryId,
    };

    if (AuthzChecker.isAdmin(userInfo)) {
      await sendCommentCreationMailToUser(infoToSendMail);
    } else {
      await sendCommentCreationToAdmin(infoToSendMail, cookie);
    }

    return newComment;
  }

  async createAnswer(userInfo: IPayload, inquiryId: number, dto: CreateAnswerDto): Promise<AnswerOutDto> {
    const inquiry = await this.findInquiryOrThrow(inquiryId);
    await AuthzChecker.checkAdmin(userInfo);

    if (inquiry.status !== InquiryStatus.PENDING) {
      throw new Error(`Inquiry status is not PENDING: ${inquiry.status}`);
    }

    const newAnswer = await AppDataSource.manager.transaction(async (manager) => {
      const answer = await this.answerService.createAnswer(inquiry, userInfo.email, userInfo.EMPKORName, dto);
      inquiry.status = InquiryStatus.RESOLVED;
      await manager.save(inquiry);
      return answer;
    });

    await sendAnswerCreationMail({
      title: inquiry.title,
      content: dto.content,
      ownerMail: inquiry.userEmail,
      id: inquiryId,
    });
    return newAnswer;
  }

  async getAnswers(userInfo: IPayload, inquiryId: number): Promise<AnswerOutDto[]> {
    const inquiry = await this.findInquiryOrThrow(inquiryId);
    await this.checkAuthzForPrivateInquiry(userInfo, inquiry);

    if (inquiry.status == InquiryStatus.PENDING) {
      return [];
    }

    const answers = await this.answerService.getAnswers(inquiry);
    return answers;
  }

  async updateAnswer(userInfo: IPayload, inquiryId: number, dto: UpdateAnswerDto): Promise<AnswerOutDto> {
    await this.findInquiryOrThrow(inquiryId);
    await AuthzChecker.checkAdmin(userInfo);
    return this.answerService.updateAnswer(inquiryId, dto);
  }

  async deleteAnswer(userInfo: IPayload, inquiryId: number): Promise<void> {
    const inquiry = await this.findInquiryOrThrow(inquiryId);
    await AuthzChecker.checkAdmin(userInfo);
    await AppDataSource.manager.transaction(async (manager) => {
      inquiry.status = InquiryStatus.PENDING;
      await manager.save(inquiry);
      await this.answerService.deleteAnswer(inquiry);
    });
  }

  async getCommentsByInquiryId(userInfo: IPayload, inquiryId: number): Promise<CommentOutDto[]> {
    const inquiry = await this.findInquiryOrThrow(inquiryId);
    await this.checkAuthzForPrivateInquiry(userInfo, inquiry);
    return this.commentService.getCommentsByInquiryId(inquiry);
  }

  async deleteComment(userInfo: IPayload, inquiryId: number, commentId: number): Promise<void> {
    const inquiry = await this.findInquiryOrThrow(inquiryId);
    await AuthzChecker.checkAuthorization(userInfo, inquiry.userEmail);
    await this.commentService.deleteComment(userInfo, inquiry, commentId);
  }

  async updateComment(userInfo: IPayload, inquiryId: number, commentId: number, commentData: UpdateCommentDto): Promise<void> {
    const inquiry = await this.findInquiryOrThrow(inquiryId);
    await AuthzChecker.checkAuthorization(userInfo, inquiry.userEmail);
    await this.commentService.updateComment(userInfo, inquiryId, commentId, commentData);
  }

  async getAttachments(userInfo: IPayload, inquiryId: number): Promise<AttachmentOutDto[]> {
    const inquiry = await this.findInquiryOrThrow(inquiryId);
    await this.checkAuthzForPrivateInquiry(userInfo, inquiry);
    const attachmentKeys = await this.attachmentService.getAttachmentKeys(inquiryId);
    const attachmentUrls = await this.attachmentService.getAttachmentDownloadURLs(inquiryId, attachmentKeys);
    return attachmentUrls;
  }

  async deleteAttachment(userInfo: IPayload, inquiryId: number, filename: string): Promise<void> {
    const inquiry = await this.findInquiryOrThrow(inquiryId);
    await AuthzChecker.checkAuthorization(userInfo, inquiry.userEmail);
    await this.attachmentService.deleteAttachment(inquiryId, filename);
  }

  async getInquiryStatistics(): Promise<{ total: number; pending: number; resolved: number }> {
    const total = await InquiryRepository.countExistingInquiries();
    const pending = await InquiryRepository.countExistingPendingInquiries();
    const resolved = await InquiryRepository.countExistingResolvedInquiries();
    return { total, pending, resolved };
  }

  // utils
  private convertInquiryToInquiryOutDto(inquiry: Inquiry): InquiryOutDto {
    if (!inquiry) {
      throw new NotFoundError();
    }
    const inquiryDto = new InquiryOutDto();
    inquiryDto.id = inquiry.inquiryId;
    inquiryDto.userEmail = inquiry.userEmail;
    inquiryDto.userName = inquiry.userName;
    inquiryDto.title = inquiry.title;
    inquiryDto.content = inquiry.content;
    inquiryDto.isPublic = inquiry.isPublic;
    inquiryDto.isDeleted = inquiry.isDeleted;
    inquiryDto.status = inquiry.status;
    inquiryDto.createdAt = inquiry.createdAt;
    inquiryDto.updatedAt = inquiry.updatedAt;
    return inquiryDto;
  }
}
