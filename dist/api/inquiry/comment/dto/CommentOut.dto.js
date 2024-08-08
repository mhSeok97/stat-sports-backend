"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentOutDto = void 0;
class CommentOutDto {
    constructor(commentId, content, userEmail, userName, isDeleted, createdAt, updatedAt, replies, parentCommentId) {
        this.commentId = commentId;
        this.content = content;
        this.userEmail = userEmail;
        this.userName = userName;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.replies = replies;
        this.parentCommentId = parentCommentId;
    }
}
exports.CommentOutDto = CommentOutDto;
//# sourceMappingURL=CommentOut.dto.js.map