import { IsBoolean, IsString, IsOptional, IsNotEmpty } from "class-validator";
export class CreateInquiryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString({ each: true })
  attachmentUUIDs: string[];

  @IsBoolean()
  isPublic: boolean;
}
