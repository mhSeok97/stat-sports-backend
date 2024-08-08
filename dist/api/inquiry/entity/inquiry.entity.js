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
exports.Inquiry = void 0;
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("api/inquiry/comment/entity/comment.entity");
const answer_entity_1 = require("api/inquiry/answer/entity/answer.entity");
const InquiryStatus_dto_1 = require("api/inquiry/dto/InquiryStatus.dto");
let Inquiry = class Inquiry {
};
exports.Inquiry = Inquiry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "inquiry_id" }),
    __metadata("design:type", Number)
], Inquiry.prototype, "inquiryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_email" }),
    __metadata("design:type", String)
], Inquiry.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_name" }),
    __metadata("design:type", String)
], Inquiry.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "title" }),
    __metadata("design:type", String)
], Inquiry.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "content", type: "text" }),
    __metadata("design:type", String)
], Inquiry.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "status" }),
    __metadata("design:type", String)
], Inquiry.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_public", default: true }),
    __metadata("design:type", Boolean)
], Inquiry.prototype, "isPublic", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Inquiry.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Inquiry.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_deleted", default: false }),
    __metadata("design:type", Boolean)
], Inquiry.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.inquiry),
    __metadata("design:type", Array)
], Inquiry.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => answer_entity_1.Answer, (answer) => answer.inquiry),
    __metadata("design:type", Array)
], Inquiry.prototype, "answers", void 0);
exports.Inquiry = Inquiry = __decorate([
    (0, typeorm_1.Entity)("inquiries")
], Inquiry);
//# sourceMappingURL=inquiry.entity.js.map