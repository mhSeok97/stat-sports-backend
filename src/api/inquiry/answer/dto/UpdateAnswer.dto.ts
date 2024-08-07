import { IsString, IsNotEmpty } from "class-validator";
export class UpdateAnswerDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
