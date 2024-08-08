"use strict";
let __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    let c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (let i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const inquiry_entity_1 = require("../../entity/inquiry.entity");
let Comment = class Comment {
    constructor(inquiry, userEmail, userName, content) {
        this.inquiry = inquiry;
        this.userEmail = userEmail;
        this.userName = userName;
        this.content = content;
    }
};
exports.Comment = Comment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "comment_id" }),
    __metadata("design:type", Number)
], Comment.prototype, "commentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "parent_comment_id", nullable: true }),
    __metadata("design:type", Number)
], Comment.prototype, "parentCommentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_email" }),
    __metadata("design:type", String)
], Comment.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_name" }),
    __metadata("design:type", String)
], Comment.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "content", type: "text" }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_deleted", default: false }),
    __metadata("design:type", Boolean)
], Comment.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inquiry_entity_1.Inquiry, (inquiry) => inquiry.comments),
    (0, typeorm_1.JoinColumn)({ name: "inquiry_id" }),
    __metadata("design:type", inquiry_entity_1.Inquiry)
], Comment.prototype, "inquiry", void 0);
exports.Comment = Comment = __decorate([
    (0, typeorm_1.Entity)("comments"),
    __metadata("design:paramtypes", [inquiry_entity_1.Inquiry, String, String, String])
], Comment);
// # sourceMappingURL=comment.entity.js.map