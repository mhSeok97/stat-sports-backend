import { Answer } from "api/inquiry/answer/entity/answer.entity";
import { AppDataSource } from "utils/mysql";

export const AnswerRepository = AppDataSource.getRepository(Answer).extend({
  findExistingAnswersByInquiryId(inquiryId: number) {
    return this.find({
      where: { inquiry: { inquiryId }, isDeleted: false },
    });
  },

  findExistingOneAnswerByInquiryId(inquiryId: number) {
    return this.findOne({
      where: { inquiry: { inquiryId }, isDeleted: false },
    });
  },

  updateDeleteFlagTrue(answerId: number) {
    return this.update( { answerId }, { isDeleted: true });
  },
});
