import { InquiryStatus } from "api/inquiry/dto/InquiryStatus.dto";
import { Inquiry } from "api/inquiry/entity/inquiry.entity";
import { AppDataSource } from "utils/mysql";
import { CreateInquiryDto } from "api/inquiry/dto/CreateInquiry.dto";
import { UpdateInquiryDto } from "api/inquiry/dto/UpdateInquiry.dto";
import { Between, FindOptionsWhere, Like } from "typeorm";
import { InquirySearchParamDto } from "api/inquiry/dto/InquirySearchParam.dto";

export const InquiryRepository = AppDataSource.getRepository(Inquiry).extend({
  findOneByInquiryId(id: number) {
    return this.findOne({ where: { inquiryId: id } });
  },

  findExistingOneByInquiryId(id: number) {
    return this.findOne({ where: { inquiryId: id, isDeleted: false } });
  },

  updateInquiry(inquiryId: number, dto: UpdateInquiryDto) {
    const dataToUpdate: Partial<UpdateInquiryDto> = {};

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

  updateDeleteFlagTrue(inquiryId: number) {
    return this.update({ inquiryId }, { isDeleted: true });
  },

  createInquiry(userEmail: string, userName: string, dto: CreateInquiryDto) {
    const inquiry = new Inquiry();
    inquiry.userEmail = userEmail;
    inquiry.userName = userName;
    inquiry.title = dto.title;
    inquiry.content = dto.content;
    inquiry.isPublic = dto.isPublic;
    inquiry.status = InquiryStatus.PENDING;

    return this.save(inquiry);
  },

  findExistingInquiriesByFilter(searchParm: InquirySearchParamDto) {
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

  countExistingInquiriesByFilter(searchParm: InquirySearchParamDto) {
    const where = createSearchCondition(searchParm);
    where.isDeleted = false;
    return this.count({ where });
  },

  countExistingInquiries(): Promise<number> {
    return this.count({ where: { isDeleted: false } });
  },

  countExistingPendingInquiries(): Promise<number> {
    return this.count({ where: { isDeleted: false, status: InquiryStatus.PENDING } });
  },

  countExistingResolvedInquiries(): Promise<number> {
    return this.count({ where: { isDeleted: false, status: InquiryStatus.RESOLVED } });
  },
});

const createSearchCondition = (searchParm: InquirySearchParamDto) => {
  const { userEmail, userName, status, title, isPublic, createdDate } = searchParm;
  const where: FindOptionsWhere<Inquiry> = {};

  if (userEmail) {
    where.userEmail = Like(`%${userEmail}%`);
  }

  if (userName) {
    where.userName = Like(`%${userName}%`);
  }

  if (status) {
    where.status = status;
  }

  if (title) {
    where.title = Like(`%${title}%`);
  }

  if (isPublic !== null && isPublic !== undefined) {
    where.isPublic = isPublic;
  }

  if (createdDate) {
    const startDate = new Date(createdDate);
    const endDate = new Date(createdDate);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    where.createdAt = Between(startDate, endDate);
  }

  return where;
};
