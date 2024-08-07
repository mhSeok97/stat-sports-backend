import { AttachmentOutDto } from "api/inquiry/attatchment/dto/AttatchmentOut.dto";
import { Service } from "typedi";
import { deleteObject, generateDownloadSignedUrl, listAllKeys, moveObjects } from "utils/s3";

@Service()
export class InquiryAttachmentService {
  // s3 tmp 경로에 있는 파일들을 inquiry 경로로 이동
  async moveTempFilesToInquiry(uuids: string[], inquiryId: number) {
    const promises = uuids.map((uuid) => {
      const oldKey = `tmp/${uuid}`;
      const newKey = `inquiry/${inquiryId}`;
      return moveObjects(oldKey, newKey);
    });

    try {
      await Promise.all(promises);
    } catch (error) {
      throw new Error(`Failed to move tmp files to inquiry: ${error}`);
    }
  }

  async getAttachmentKeys(inquiryId: number): Promise<string[]> {
    try {
      return await listAllKeys(`inquiry/${inquiryId}`);
    } catch (error) {
      throw new Error(`Failed to get attachments of inquiry ${inquiryId}: ${error}`);
    }
  }

  private extractFileName(inquiryId: number, attachmentKey: string): string {
    const fileName = attachmentKey.split(`inquiry/${inquiryId}/`)[1];
    if (!fileName) {
      throw new Error(`Failed to extract file name from ${attachmentKey}`);
    }
    return fileName;
  }

  async deleteAttachment(inquiryId: number, attachmentFile: string) {
    const deleteKey = `inquiry/${inquiryId}/${attachmentFile}`;
    try {
      await deleteObject(deleteKey);
    } catch (error) {
      throw new Error(`Failed to delete attachment ${deleteKey}: ${error}`);
    }
  }

  async getAttachmentDownloadURLs(inquiryId: number, attachmentKeys: string[]): Promise<AttachmentOutDto[]> {
    const expiresIn = 3600 * 10;

    const promises = attachmentKeys.map(async (key) => {
      const fileName = this.extractFileName(inquiryId, key);
      const downloadUrl = await generateDownloadSignedUrl(key, expiresIn);
      return new AttachmentOutDto(fileName, key, downloadUrl);
    });

    try {
      return await Promise.all(promises);
    } catch (error) {
      throw new Error(`Failed to generate download URLs: ${error}`);
    }
  }

  async handleUpdatedAttachments(inquiryId: number, newAttachmentKeys: string[], newAttachmentUUIDs: string[]) {
    const oldAttachmentKeys = await this.getAttachmentKeys(inquiryId);

    const deletePromises = oldAttachmentKeys
      .filter((key) => !newAttachmentKeys.includes(key))
      .map(async (key) => {
        const fileName = this.extractFileName(inquiryId, key);
        await this.deleteAttachment(inquiryId, fileName);
      });

    try {
      await Promise.all(deletePromises);
      await this.moveTempFilesToInquiry(newAttachmentUUIDs, inquiryId);
    } catch (error) {
      throw new Error(`Failed to handle updated attachments for inquiry ${inquiryId}: ${error}`);
    }
  }
}
