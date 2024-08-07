import { IsString, IsNotEmpty } from "class-validator";
export class CreateReplyDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
