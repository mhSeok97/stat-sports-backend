"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerRepository = void 0;
const answer_entity_1 = require("api/inquiry/answer/entity/answer.entity");
const mysql_1 = require("utils/mysql");
exports.AnswerRepository = mysql_1.AppDataSource.getRepository(answer_entity_1.Answer).extend({
    findExistingAnswersByInquiryId(inquiryId) {
        return this.find({
            where: { inquiry: { inquiryId }, isDeleted: false },
        });
    },
    findExistingOneAnswerByInquiryId(inquiryId) {
        return this.findOne({
            where: { inquiry: { inquiryId }, isDeleted: false },
        });
    },
    updateDeleteFlagTrue(answerId) {
        return this.update({ answerId }, { isDeleted: true });
    },
});
//# sourceMappingURL=answer.repository.js.map