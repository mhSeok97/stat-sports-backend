import { IsString } from "class-validator";
import { Type } from "class-transformer";

export class S3TmpInDto {
  @Type(() => String)
  @IsString()
  filename: string;
}
