// src/dto/pagination.dto.ts
import { InquiryStatus } from "api/inquiry/dto/InquiryStatus.dto";
import { Type } from "class-transformer";
import { IsInt, Min, IsOptional, IsString, IsBoolean, IsDate } from "class-validator";

export class InquirySearchParamDto {
  @IsOptional()
  @Type(() => Number) // 쿼리 파라미터가 문자열로 들어올 경우 숫자로 변환
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number) // 쿼리 파라미터가 문자열로 들어올 경우 숫자로 변환
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @Type(() => String)
  status?: InquiryStatus = null;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isPublic?: boolean = null;

  @IsOptional()
  @IsString()
  @Type(() => String)
  userEmail?: string = null;

  @IsOptional()
  @IsString()
  @Type(() => String)
  userName?: string = null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdDate?: Date = null;

  @IsOptional()
  @IsString()
  @Type(() => String)
  title?: string = null;
}
