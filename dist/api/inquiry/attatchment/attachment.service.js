"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryAttachmentService = void 0;
const AttatchmentOut_dto_1 = require("api/inquiry/attatchment/dto/AttatchmentOut.dto");
const typedi_1 = require("typedi");
const s3_1 = require("utils/s3");
let InquiryAttachmentService = class InquiryAttachmentService {
    async moveTempFilesToInquiry(uuids, inquiryId) {
        const promises = uuids.map((uuid) => {
            const oldKey = `tmp/${uuid}`;
            const newKey = `inquiry/${inquiryId}`;
            return (0, s3_1.moveObjects)(oldKey, newKey);
        });
        try {
            await Promise.all(promises);
        }
        catch (error) {
            throw new Error(`Failed to move tmp files to inquiry: ${error}`);
        }
    }
    async getAttachmentKeys(inquiryId) {
        try {
            return await (0, s3_1.listAllKeys)(`inquiry/${inquiryId}`);
        }
        catch (error) {
            throw new Error(`Failed to get attachments of inquiry ${inquiryId}: ${error}`);
        }
    }
    extractFileName(inquiryId, attachmentKey) {
        const fileName = attachmentKey.split(`inquiry/${inquiryId}/`)[1];
        if (!fileName) {
            throw new Error(`Failed to extract file name from ${attachmentKey}`);
        }
        return fileName;
    }
    async deleteAttachment(inquiryId, attachmentFile) {
        const deleteKey = `inquiry/${inquiryId}/${attachmentFile}`;
        try {
            await (0, s3_1.deleteObject)(deleteKey);
        }
        catch (error) {
            throw new Error(`Failed to delete attachment ${deleteKey}: ${error}`);
        }
    }
    async getAttachmentDownloadURLs(inquiryId, attachmentKeys) {
        const expiresIn = 3600 * 10;
        const promises = attachmentKeys.map(async (key) => {
            const fileName = this.extractFileName(inquiryId, key);
            const downloadUrl = await (0, s3_1.generateDownloadSignedUrl)(key, expiresIn);
            return new AttatchmentOut_dto_1.AttachmentOutDto(fileName, key, downloadUrl);
        });
        try {
            return await Promise.all(promises);
        }
        catch (error) {
            throw new Error(`Failed to generate download URLs: ${error}`);
        }
    }
    async handleUpdatedAttachments(inquiryId, newAttachmentKeys, newAttachmentUUIDs) {
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
        }
        catch (error) {
            throw new Error(`Failed to handle updated attachments for inquiry ${inquiryId}: ${error}`);
        }
    }
};
exports.InquiryAttachmentService = InquiryAttachmentService;
exports.InquiryAttachmentService = InquiryAttachmentService = __decorate([
    (0, typedi_1.Service)()
], InquiryAttachmentService);
//# sourceMappingURL=attachment.service.js.map