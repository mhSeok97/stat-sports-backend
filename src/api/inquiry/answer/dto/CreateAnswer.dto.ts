import { IsString, IsNotEmpty } from "class-validator";
export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
