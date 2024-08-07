import { apiSuccess } from "api/common/dto/api-utils.dto";
import { S3TmpInDto } from "api/s3/dto/s3TmpIn.dto";
import { S3Service } from "api/s3/s3.service";
import { swaggerDocument } from "config/swagger.config";
import { Body, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { logger } from "utils/logger";

@JsonController("/files")
export class S3Controller {
  constructor(private s3Service: S3Service) {}

  @Post("/upload-url/tmp")
  @OpenAPI(swaggerDocument.GENERATE_UPLOAD_URL_TMP)
  async generateUploadUrlTmp(@Body() s3Dto: S3TmpInDto) {
    logger.info("generating upload url for tmp/");
    try {
      const result = await this.s3Service.generateUploadUrlTmp(s3Dto);
      return apiSuccess(result);
    } catch (error) {
      throw new Error(`Failed to generate upload url for tmp/: ${error}`);
    }
  }
}
