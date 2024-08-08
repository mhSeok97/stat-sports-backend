"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryCommentService = void 0;
const comment_entity_1 = require("./entity/comment.entity");
const typedi_1 = require("typedi");
const CommentOut_dto_1 = require("api/inquiry/comment/dto/CommentOut.dto");
const comment_repository_1 = require("api/inquiry/comment/repository/comment.repository");
const routing_controllers_1 = require("routing-controllers");
const authzChecker_1 = require("utils/authzChecker");
let InquiryCommentService = class InquiryCommentService {
    async findCommentOrThrow(inquiryId, commentId) {
        const comment = await comment_repository_1.CommentRepository.findExistingOneByInquiryIdAndCommentId(inquiryId, commentId);
        if (!comment) {
            throw new routing_controllers_1.NotFoundError(`Comment not found: commentId=${commentId}`);
        }
        return comment;
    }
    async createComment(inquiry, userEmail, userName, dto) {
        const newComment = new comment_entity_1.Comment(inquiry, userEmail, userName, dto.content);
        const savedComment = await comment_repository_1.CommentRepository.save(newComment);
        return this.convertCommentToCommentOutDto(savedComment);
    }
    async getCommentsByInquiryId(inquiry) {
        const comments = await comment_repository_1.CommentRepository.getCommentsByInquiryId(inquiry.inquiryId);
        comments.forEach((comment) => this.maskingDeletedComment(comment));
        const commentList = comments.map((comment) => this.convertCommentToCommentOutDto(comment));
        return commentList;
    }
    maskingDeletedComment(comment) {
        if (comment.isDeleted) {
            comment.content = null;
        }
        return comment;
    }
    convertCommentToCommentOutDto(comment) {
        return new CommentOut_dto_1.CommentOutDto(comment.commentId, comment.content, comment.userEmail, comment.userName, comment.isDeleted, comment.createdAt, comment.updatedAt, [], comment.parentCommentId);
    }
    async deleteComment(userInfo, inquiry, commentId) {
        const comment = await this.findCommentOrThrow(inquiry.inquiryId, commentId);
        await authzChecker_1.AuthzChecker.checkOwner(userInfo, comment.userEmail);
        await comment_repository_1.CommentRepository.updateDeleteFlagTrue(commentId);
    }
    async updateComment(userInfo, inquiryId, commentId, commentData) {
        const comment = await this.findCommentOrThrow(inquiryId, commentId);
        await authzChecker_1.AuthzChecker.checkOwner(userInfo, comment.userEmail);
        comment.content = commentData.content;
        await comment_repository_1.CommentRepository.save(comment);
    }
};
exports.InquiryCommentService = InquiryCommentService;
exports.InquiryCommentService = InquiryCommentService = __decorate([
    (0, typedi_1.Service)()
], InquiryCommentService);
//# sourceMappingURL=comment.service.js.map