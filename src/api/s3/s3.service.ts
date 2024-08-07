import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3InDto } from "api/s3/dto/s3In.dto";
import { S3OutDto } from "api/s3/dto/s3Out.dto";
import { S3TmpInDto } from "api/s3/dto/s3TmpIn.dto";
import { randomUUID } from "crypto";
import { Service } from "typedi";
import { s3Bucket, s3Client } from "utils/s3";

@Service()
export class S3Service {
  private client: S3Client;
  constructor() {
    this.client = s3Client;
  }

  async generateDownloadUrl(s3InDto: S3InDto): Promise<S3OutDto> {
    const { key } = s3InDto;

    try {
      const signedUrl = await getSignedUrl(this.client, new GetObjectCommand({ Bucket: s3Bucket, Key: key }), { expiresIn: 3600 });
      return new S3OutDto(key, signedUrl);
    } catch (error) {
      throw new Error(`Failed to generate download url: ${error}`);
    }
  }

  async generateUploadUrl(s3InDto: S3InDto): Promise<S3OutDto> {
    const { key } = s3InDto;
    try {
      const signedUrl = await getSignedUrl(this.client, new PutObjectCommand({ Bucket: s3Bucket, Key: key }), { expiresIn: 3600 });
      return new S3OutDto(key, signedUrl);
    } catch (error) {
      throw new Error(`Failed to generate upload url: ${error}`);
    }
  }

  async generateUploadUrlTmp(s3TmpDto: S3TmpInDto): Promise<S3OutDto> {
    const { filename } = s3TmpDto;

    try {
      const uuid = randomUUID();
      const key = `tmp/${uuid}/${filename}`;
      const signedUrl = await getSignedUrl(this.client, new PutObjectCommand({ Bucket: s3Bucket, Key: key }), { expiresIn: 3600 });
      return new S3OutDto(key, signedUrl, filename, uuid);
    } catch (error) {
      throw new Error(`Failed to generate upload url for tmp/: ${error}`);
    }
  }
}
