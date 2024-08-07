import { InquiryOutDto } from "api/inquiry/dto/InquiryOut.dto";

export class InquiryListOutDto {
  constructor(inquiries: InquiryOutDto[], total: number) {
    this.inquiries = inquiries;
    this.total = total;
  }
  inquiries: InquiryOutDto[];
  total: number;
}
