"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquirySearchParamDto = void 0;
const InquiryStatus_dto_1 = require("api/inquiry/dto/InquiryStatus.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class InquirySearchParamDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.status = null;
        this.isPublic = null;
        this.userEmail = null;
        this.userName = null;
        this.createdDate = null;
        this.title = null;
    }
}
exports.InquirySearchParamDto = InquirySearchParamDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], InquirySearchParamDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], InquirySearchParamDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], InquirySearchParamDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], InquirySearchParamDto.prototype, "isPublic", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], InquirySearchParamDto.prototype, "userEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], InquirySearchParamDto.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], InquirySearchParamDto.prototype, "createdDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], InquirySearchParamDto.prototype, "title", void 0);
//# sourceMappingURL=InquirySearchParam.dto.js.map