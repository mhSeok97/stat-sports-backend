"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const comment_entity_1 = require("api/inquiry/comment/entity/comment.entity");
const mysql_1 = require("utils/mysql");
exports.CommentRepository = mysql_1.AppDataSource.getRepository(comment_entity_1.Comment).extend({
    getCommentsByInquiryId(inquiryId) {
        return this.createQueryBuilder("comment")
            .where("comment.inquiry_id = :inquiryId", { inquiryId })
            .orderBy("comment.created_at", "ASC")
            .getMany();
    },
    findByInquiryIdAndCommentId(inquiryId, commentId) {
        return this.findOne({
            where: {
                commentId,
                inquiry: { inquiryId },
            },
        });
    },
    findExistingOneByInquiryIdAndCommentId(inquiryId, commentId) {
        return this.findOne({
            where: {
                commentId,
                inquiry: { inquiryId },
                isDeleted: false,
            },
        });
    },
    updateDeleteFlagTrue(commentId) {
        return this.update({ commentId }, { isDeleted: true });
    },
});
// # sourceMappingURL=comment.repository.js.map