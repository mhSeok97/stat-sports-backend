import { IsString } from "class-validator";
import { Type } from "class-transformer";
export class S3InDto {
  @Type(() => String)
  @IsString()
  key: string;
}
