import { BadRequestError } from "routing-controllers";

export class HttpException extends BadRequestError {
  public errType: string;
  public status: number;
  public message: string;
  public errObj: any;

  constructor(status: number, message: string, errObj: any) {
    super(message);
    this.errType = "HttpException";
    this.status = status;
    this.message = message;
    this.errObj = errObj;
  }
}
