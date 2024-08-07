import { CreateCommentDto } from "api/inquiry/comment/dto/CreateComment.dto";
import { Comment } from "./entity/comment.entity";
import { Service } from "typedi";
import { Inquiry } from "api/inquiry/entity/inquiry.entity";
import { CommentOutDto } from "api/inquiry/comment/dto/CommentOut.dto";
import { UpdateCommentDto } from "api/inquiry/comment/dto/UpdateComment.dto";
import { CommentRepository } from "api/inquiry/comment/repository/comment.repository";
import { NotFoundError } from "routing-controllers";
import { IPayload } from "interfaces/payload.interface";
import { AuthzChecker } from "utils/authzChecker";

@Service()
export class InquiryCommentService {
  private async findCommentOrThrow(inquiryId: number, commentId: number): Promise<Comment> {
    const comment = await CommentRepository.findExistingOneByInquiryIdAndCommentId(inquiryId, commentId);
    if (!comment) {
      throw new NotFoundError(`Comment not found: commentId=${commentId}`);
    }
    return comment;
  }

  async createComment(inquiry: Inquiry, userEmail: string, userName: string, dto: CreateCommentDto): Promise<CommentOutDto> {
    const newComment = new Comment(inquiry, userEmail, userName, dto.content);
    const savedComment = await CommentRepository.save(newComment);
    return this.convertCommentToCommentOutDto(savedComment);
  }

  async getCommentsByInquiryId(inquiry: Inquiry): Promise<CommentOutDto[]> {
    const comments = await CommentRepository.getCommentsByInquiryId(inquiry.inquiryId);

    // 삭제된 댓글 마스킹
    comments.forEach((comment) => this.maskingDeletedComment(comment));
    const commentList = comments.map((comment) => this.convertCommentToCommentOutDto(comment));
    return commentList;
  }

  private maskingDeletedComment(comment: Comment): Comment {
    if (comment.isDeleted) {
      comment.content = null;
    }
    return comment;
  }

  private convertCommentToCommentOutDto(comment: Comment): CommentOutDto {
    return new CommentOutDto(
      comment.commentId,
      comment.content,
      comment.userEmail,
      comment.userName,
      comment.isDeleted,
      comment.createdAt,
      comment.updatedAt,
      [],
      comment.parentCommentId,
    );
  }

  async deleteComment(userInfo: IPayload, inquiry: Inquiry, commentId: number): Promise<void> {
    const comment = await this.findCommentOrThrow(inquiry.inquiryId, commentId);
    await AuthzChecker.checkOwner(userInfo, comment.userEmail);
    await CommentRepository.updateDeleteFlagTrue(commentId);
  }

  async updateComment(userInfo: IPayload, inquiryId: number, commentId: number, commentData: UpdateCommentDto): Promise<void> {
    const comment = await this.findCommentOrThrow(inquiryId, commentId);
    await AuthzChecker.checkOwner(userInfo, comment.userEmail);
    comment.content = commentData.content;
    await CommentRepository.save(comment);
  }
}
