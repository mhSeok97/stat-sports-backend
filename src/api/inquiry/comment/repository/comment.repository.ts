import { Comment } from "api/inquiry/comment/entity/comment.entity";
import { AppDataSource } from "utils/mysql";

export const CommentRepository = AppDataSource.getRepository(Comment).extend({
  getCommentsByInquiryId(inquiryId: number) {
    return this.createQueryBuilder("comment")
      .where("comment.inquiry_id = :inquiryId", { inquiryId })
      .orderBy("comment.created_at", "ASC")
      .getMany();
  },

  findByInquiryIdAndCommentId(inquiryId: number, commentId: number) {
    return this.findOne({
      where: {
        commentId,
        inquiry: { inquiryId },
      },
    });
  },

  findExistingOneByInquiryIdAndCommentId(inquiryId: number, commentId: number) {
    return this.findOne({
      where: {
        commentId,
        inquiry: { inquiryId },
        isDeleted: false,
      },
    });
  },

  updateDeleteFlagTrue(commentId: number) {
    return this.update({ commentId }, { isDeleted: true });
  },
});
