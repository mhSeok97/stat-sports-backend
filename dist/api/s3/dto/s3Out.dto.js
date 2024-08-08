"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3OutDto = void 0;
class S3OutDto {
    constructor(key, presignedUrl, fileName, uuid) {
        this.key = key;
        this.presignedUrl = presignedUrl;
        this.fileName = fileName;
        this.uuid = uuid;
    }
}
exports.S3OutDto = S3OutDto;
// # sourceMappingURL=s3Out.dto.js.map