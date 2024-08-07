export class AttachmentOutDto {
  constructor(fileName: string, filekey: string, presignedUrl: string) {
    this.fileName = fileName;
    this.filekey = filekey;
    this.presignedUrl = presignedUrl;
  }
  fileName: string;
  filekey: string;
  presignedUrl: string;
}
