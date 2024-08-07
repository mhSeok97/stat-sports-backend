import { JsonController, Body, Get, Post, Delete, Param, Authorized, CurrentUser, Put, QueryParams, Req } from "routing-controllers";
import { InquiryService } from "./inquiry.service";
import { CreateInquiryDto } from "api/inquiry/dto/CreateInquiry.dto";
import { logger } from "utils/logger";
import { IPayload } from "interfaces/payload.interface";
import { CreateCommentDto } from "api/inquiry/comment/dto/CreateComment.dto";
import { apiSuccess } from "api/common/dto/api-utils.dto";
import { UpdateInquiryDto } from "api/inquiry/dto/UpdateInquiry.dto";
import { UpdateCommentDto } from "api/inquiry/comment/dto/UpdateComment.dto";
import { OpenAPI } from "routing-controllers-openapi";
import { CreateAnswerDto } from "api/inquiry/answer/dto/CreateAnswer.dto";
import { UpdateAnswerDto } from "api/inquiry/answer/dto/UpdateAnswer.dto";
import { InquirySearchParamDto } from "api/inquiry/dto/InquirySearchParam.dto";
import { swaggerDocument } from "config/swagger.config";
import { Request } from "express";

@OpenAPI({ security: [{ AuthPayload: [] }] })
@JsonController("/inquiries")
export class InquiryController {
  constructor(private inquiryService: InquiryService) {}

  @Get()
  @Authorized()
  @OpenAPI(swaggerDocument.GET_INQUIRIES)
  async getInquiries(@QueryParams() queryParmDto: InquirySearchParamDto) {
    logger.info(`getting inquiries with query params: ${JSON.stringify(queryParmDto)}`);
    const inquiries = await this.inquiryService.getInquiries(queryParmDto);
    logger.info(JSON.stringify(inquiries));
    return apiSuccess(inquiries);
  }

  @Post()
  @Authorized()
  @OpenAPI(swaggerDocument.CREATE_INQUIRY)
  async createInquiry(@Req() req: Request, @CurrentUser({ required: true }) userInfo: IPayload, @Body() inquiryData: CreateInquiryDto) {
    logger.info(`creating inquiry by user: ${userInfo.email}`);
    const newInquiry = await this.inquiryService.createInquiry(userInfo.email, userInfo.EMPKORName, inquiryData, req.headers.cookie);
    logger.info(JSON.stringify(newInquiry));
    return apiSuccess(newInquiry);
  }

  @Get("/stats")
  @Authorized()
  @OpenAPI(swaggerDocument.GET_INQUIRY_STATS)
  async getInquiryStatistics() {
    logger.info("getting inquiry statistics");
    const summary = await this.inquiryService.getInquiryStatistics();
    logger.info(JSON.stringify(summary));
    return apiSuccess(summary);
  }

  @Delete("/:id")
  @Authorized()
  @OpenAPI(swaggerDocument.DELETE_INQUIRY)
  async deleteInquiry(@CurrentUser({ required: true }) userInfo: IPayload, @Param("id") id: number) {
    logger.info(`deleting inquiry id: ${id} by user: ${userInfo.email}`);
    await this.inquiryService.deleteInquiry(userInfo, id);
    return apiSuccess("Inquiry deleted successfully.");
  }

  @Get("/:id")
  @Authorized()
  @OpenAPI(swaggerDocument.GET_INQUIRY_DETAIL)
  async getInquiryDetail(@CurrentUser({ required: true }) userInfo: IPayload, @Param("id") id: number) {
    logger.info(`getting inquiry id ${id} by user: ${userInfo.email}`);
    const inquiry = await this.inquiryService.getInquiryDetail(userInfo, id);
    logger.info(JSON.stringify(inquiry));
    return apiSuccess(inquiry);
  }

  @Put("/:id")
  @Authorized()
  @OpenAPI(swaggerDocument.UPDATE_INQUIRY)
  async updateInquiry(@CurrentUser({ required: true }) userInfo: IPayload, @Param("id") id: number, @Body() inquiryData: UpdateInquiryDto) {
    logger.info(`updating inquiry id: ${id} by user: ${userInfo.email}`);
    logger.info(JSON.stringify(inquiryData));
    await this.inquiryService.updateInquiry(userInfo, id, inquiryData);
    return apiSuccess("Inquiry updated successfully.");
  }

  @Get("/:id/answers")
  @Authorized()
  @OpenAPI(swaggerDocument.GET_ANSWER)
  async getAnswer(@CurrentUser({ required: true }) userInfo: IPayload, @Param("id") id: number) {
    logger.info(`getting answers for inquiry id: ${id} by user: ${userInfo.email}`);
    const newAnswer = await this.inquiryService.getAnswers(userInfo, id);
    logger.info(JSON.stringify(newAnswer));
    return apiSuccess(newAnswer);
  }

  @Post("/:id/answers")
  @Authorized()
  @OpenAPI(swaggerDocument.CREATE_ANSWER)
  async createAnswer(@CurrentUser({ required: true }) userInfo: IPayload, @Param("id") id: number, @Body() data: CreateAnswerDto) {
    logger.info(`creating answer for inquiry id: ${id} by user: ${userInfo.email}`);
    const newAnswer = await this.inquiryService.createAnswer(userInfo, id, data);
    logger.info(JSON.stringify(newAnswer));
    return apiSuccess(newAnswer);
  }

  @Put("/:id/answers")
  @Authorized()
  @OpenAPI(swaggerDocument.UPDATE_ANSWER)
  async updateAnswer(@CurrentUser({ required: true }) userInfo: IPayload, @Param("id") id: number, @Body() data: UpdateAnswerDto) {
    logger.info(`updating answer for inquiry id: ${id} by user: ${userInfo.email}`);
    const updatedAnswer = await this.inquiryService.updateAnswer(userInfo, id, data);
    logger.info(JSON.stringify(updatedAnswer));
    return apiSuccess(updatedAnswer);
  }

  @Delete("/:id/answers")
  @Authorized()
  @OpenAPI(swaggerDocument.DELETE_ANSWER)
  async deleteAnswer(@CurrentUser({ required: true }) userInfo: IPayload, @Param("id") id: number) {
    logger.info(`deleting answer for inquiry id: ${id} by user: ${userInfo.email}`);
    const deletedAnswer = await this.inquiryService.deleteAnswer(userInfo, id);
    logger.info(JSON.stringify(deletedAnswer));
    return apiSuccess(deletedAnswer);
  }

  @Post("/:id/comments")
  @Authorized()
  @OpenAPI(swaggerDocument.CREATE_COMMENT)
  async createComment(
    @Req() req: Request,
    @CurrentUser({ required: true }) userInfo: IPayload,
    @Param("id") id: number,
    @Body() commentData: CreateCommentDto,
  ) {
    logger.info(`creating comment for inquiry id: ${id} by user: ${userInfo.email}`);
    const newComment = await this.inquiryService.createComment(userInfo, id, commentData, req.headers.cookie);
    logger.info(JSON.stringify(newComment));
    return apiSuccess(newComment);
  }

  @Get("/:id/comments")
  @Authorized()
  @OpenAPI(swaggerDocument.GET_COMMENTS_BY_INQUIRY_ID)
  async getCommentsByInquiryId(@CurrentUser({ required: true }) userInfo: IPayload, @Param("id") id: number) {
    logger.info(`getting comments by inquiry id: ${id}`);
    const comment = await this.inquiryService.getCommentsByInquiryId(userInfo, id);
    logger.info(JSON.stringify(comment));
    return apiSuccess(comment);
  }

  @Delete("/:id/comments/:commentId")
  @Authorized()
  @OpenAPI(swaggerDocument.DELETE_COMMENT)
  async deleteComment(@CurrentUser({ required: true }) userInfo: IPayload, @Param("id") id: number, @Param("commentId") commentId: number) {
    logger.info(`deleting comment for inquiry id: ${id}, comment id: ${commentId} by user: ${userInfo.email}`);
    await this.inquiryService.deleteComment(userInfo, id, commentId);
    return apiSuccess("Comment deleted successfully.");
  }

  @Put("/:id/comments/:commentId")
  @Authorized()
  @OpenAPI(swaggerDocument.UPDATE_COMMENT)
  async updateComment(
    @CurrentUser({ required: true }) userInfo: IPayload,
    @Param("id") id: number,
    @Param("commentId") commentId: number,
    @Body() commentData: UpdateCommentDto,
  ) {
    logger.info(`updating comment for inquiry id: ${id}, comment id: ${commentId} by user: ${userInfo.email}`);
    logger.info(JSON.stringify(commentData));
    await this.inquiryService.updateComment(userInfo, id, commentId, commentData);
    return apiSuccess("Comment updated successfully.");
  }

  @Get("/:id/attachments")
  @Authorized()
  @OpenAPI(swaggerDocument.GET_ATTACHMENTS)
  async getAttachments(@CurrentUser({ required: true }) userInfo: IPayload, @Param("id") id: number) {
    logger.info(`getting attachments for inquiry id: ${id} by user: ${userInfo.email}`);
    const attachments = await this.inquiryService.getAttachments(userInfo, id);
    logger.info(JSON.stringify(attachments));
    return apiSuccess(attachments);
  }

  @Delete("/:id/attachments/:filename")
  @Authorized()
  @OpenAPI(swaggerDocument.DELETE_ATTACHMENT)
  async deleteAttachment(
    @CurrentUser({ required: true }) userInfo: IPayload,
    @Param("id") id: number,
    @Param("filename") filename: string,
  ) {
    logger.info(`deleting attachment for inquiry id: ${id}, filename: ${filename} by user: ${userInfo.email}`);
    await this.inquiryService.deleteAttachment(userInfo, id, filename);
    return apiSuccess("Attachment deleted successfully.");
  }

  // @Post("/:id/comments/:commentId/replies")
  // @Authorized()
  // @OpenAPI({ summary: "대댓글 등록", description: "댓글/문의 답변에 대댓글을 달 수 있음." })
  // async createReply(
  //   @CurrentUser({ required: true }) userInfo: IPayload,
  //   @Param("id") id: number,
  //   @Param("commentId") commentId: number,
  //   @Body() replyData: CreateReplyDto,
  // ) {
  //   logger.info(`creating reply for inquiry id: ${id}, parent comment id: ${commentId} by user: ${userInfo.email}`);
  //   const newReply = await this.inquiryService.createReply(id, userInfo.email, commentId, replyData);
  //   logger.info(JSON.stringify(newReply));
  //   return apiSuccess(newReply);
  // }
}
