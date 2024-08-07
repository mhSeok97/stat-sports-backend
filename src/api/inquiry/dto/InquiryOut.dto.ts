import { AttachmentOutDto } from "api/inquiry/attatchment/dto/AttatchmentOut.dto";
import { InquiryStatus } from "api/inquiry/dto/InquiryStatus.dto";

export class InquiryOutDto {
  id: number;
  title: string;
  content: string;
  userEmail: string;
  userName: string;
  attachments: AttachmentOutDto[];
  isPublic: boolean;
  isDeleted: boolean;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}
