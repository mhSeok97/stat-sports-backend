import { CreateAnswerDto } from "api/inquiry/answer/dto/CreateAnswer.dto";
import { Answer } from "./entity/answer.entity";
import { Service } from "typedi";
import { Inquiry } from "api/inquiry/entity/inquiry.entity";
import { AnswerOutDto } from "api/inquiry/answer/dto/AnswerOut.dto";
import { UpdateAnswerDto } from "api/inquiry/answer/dto/UpdateAnswer.dto";
import { AnswerRepository } from "api/inquiry/answer/repository/answer.repository";
import { NotFoundError } from "routing-controllers";

@Service()
export class InquiryAnswerService {
  private async findAnswerOrThrow(inquiryId: number): Promise<Answer> {
    const answer = await AnswerRepository.findExistingOneAnswerByInquiryId(inquiryId);
    if (!answer) {
      throw new NotFoundError(`Answer not found: answerId=${inquiryId}`);
    }
    return answer;
  }

  async getAnswers(inquiry: Inquiry): Promise<AnswerOutDto[]> {
    const answers = await AnswerRepository.findExistingAnswersByInquiryId(inquiry.inquiryId);
    return answers.map((answer) => this.convertAnswerToAnswerOutDto(answer));
  }

  async createAnswer(inquiry: Inquiry, userEmail: string, userName: string, dto: CreateAnswerDto): Promise<AnswerOutDto> {
    const newAnswer = new Answer();
    newAnswer.inquiry = inquiry;
    newAnswer.userEmail = userEmail;
    newAnswer.userName = userName;
    newAnswer.content = dto.content;
    const savedAnswer = await AnswerRepository.save(newAnswer);
    return this.convertAnswerToAnswerOutDto(savedAnswer);
  }

  private convertAnswerToAnswerOutDto(answer: Answer): AnswerOutDto {
    const answerDto = new AnswerOutDto();
    answerDto.answerId = answer.answerId;
    answerDto.content = answer.content;
    answerDto.userEmail = answer.userEmail;
    answerDto.userName = answer.userName;
    answerDto.isDeleted = answer.isDeleted;
    answerDto.createdAt = answer.createdAt;
    answerDto.updatedAt = answer.updatedAt;
    return answerDto;
  }

  async deleteAnswer(inquiry: Inquiry): Promise<void> {
    const answer = await this.findAnswerOrThrow(inquiry.inquiryId);
    await AnswerRepository.updateDeleteFlagTrue(answer.answerId);
  }

  async updateAnswer(inquiryId: number, data: UpdateAnswerDto): Promise<AnswerOutDto> {
    const answer = await this.findAnswerOrThrow(inquiryId);
    answer.content = data.content;
    const updatedAnswer = await AnswerRepository.save(answer);
    return this.convertAnswerToAnswerOutDto(updatedAnswer);
  }
}
