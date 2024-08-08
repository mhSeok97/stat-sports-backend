"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryRepository = void 0;
const InquiryStatus_dto_1 = require("api/inquiry/dto/InquiryStatus.dto");
const inquiry_entity_1 = require("api/inquiry/entity/inquiry.entity");
const mysql_1 = require("utils/mysql");
const typeorm_1 = require("typeorm");
exports.InquiryRepository = mysql_1.AppDataSource.getRepository(inquiry_entity_1.Inquiry).extend({
    findOneByInquiryId(id) {
        return this.findOne({ where: { inquiryId: id } });
    },
    findExistingOneByInquiryId(id) {
        return this.findOne({ where: { inquiryId: id, isDeleted: false } });
    },
    updateInquiry(inquiryId, dto) {
        const dataToUpdate = {};
        if (dto.title) {
            dataToUpdate.title = dto.title;
        }
        if (dto.content) {
            dataToUpdate.content = dto.content;
        }
        if (dto.isPublic !== undefined) {
            dataToUpdate.isPublic = dto.isPublic;
        }
        return this.update({ inquiryId }, dataToUpdate);
    },
    updateDeleteFlagTrue(inquiryId) {
        return this.update({ inquiryId }, { isDeleted: true });
    },
    createInquiry(userEmail, userName, dto) {
        const inquiry = new inquiry_entity_1.Inquiry();
        inquiry.userEmail = userEmail;
        inquiry.userName = userName;
        inquiry.title = dto.title;
        inquiry.content = dto.content;
        inquiry.isPublic = dto.isPublic;
        inquiry.status = InquiryStatus_dto_1.InquiryStatus.PENDING;
        return this.save(inquiry);
    },
    findExistingInquiriesByFilter(searchParm) {
        const { page, limit } = searchParm;
        const where = createSearchCondition(searchParm);
        where.isDeleted = false;
        return this.find({
            where,
            take: limit,
            skip: (page - 1) * limit,
            order: { createdAt: "DESC" },
            select: ["inquiryId", "title", "userEmail", "userName", "isPublic", "status", "createdAt", "updatedAt"],
        });
    },
    countExistingInquiriesByFilter(searchParm) {
        const where = createSearchCondition(searchParm);
        where.isDeleted = false;
        return this.count({ where });
    },
    countExistingInquiries() {
        return this.count({ where: { isDeleted: false } });
    },
    countExistingPendingInquiries() {
        return this.count({ where: { isDeleted: false, status: InquiryStatus_dto_1.InquiryStatus.PENDING } });
    },
    countExistingResolvedInquiries() {
        return this.count({ where: { isDeleted: false, status: InquiryStatus_dto_1.InquiryStatus.RESOLVED } });
    },
});
const createSearchCondition = (searchParm) => {
    const { userEmail, userName, status, title, isPublic, createdDate } = searchParm;
    const where = {};
    if (userEmail) {
        where.userEmail = (0, typeorm_1.Like)(`%${userEmail}%`);
    }
    if (userName) {
        where.userName = (0, typeorm_1.Like)(`%${userName}%`);
    }
    if (status) {
        where.status = status;
    }
    if (title) {
        where.title = (0, typeorm_1.Like)(`%${title}%`);
    }
    if (isPublic !== null && isPublic !== undefined) {
        where.isPublic = isPublic;
    }
    if (createdDate) {
        const startDate = new Date(createdDate);
        const endDate = new Date(createdDate);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        where.createdAt = (0, typeorm_1.Between)(startDate, endDate);
    }
    return where;
};
//# sourceMappingURL=inquiry.repository.js.map