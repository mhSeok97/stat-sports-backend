export class S3OutDto {
  constructor(key: string, presignedUrl: string, fileName?: string, uuid?: string) {
    this.key = key;
    this.presignedUrl = presignedUrl;
    this.fileName = fileName;
    this.uuid = uuid;
  }
  key: string;
  presignedUrl: string;
  fileName?: string;
  uuid?: string;
}
