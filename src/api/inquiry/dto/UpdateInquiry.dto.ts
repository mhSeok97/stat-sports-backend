import { IsBoolean, IsString, IsArray, IsOptional } from "class-validator";

export class UpdateInquiryDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachmentKeys: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachmentUUIDs: string[];

  @IsOptional()
  @IsBoolean()
  isPublic: boolean;
}
