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
exports.Answer = void 0;
const typeorm_1 = require("typeorm");
const inquiry_entity_1 = require("../../entity/inquiry.entity");
let Answer = class Answer {
};
exports.Answer = Answer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "answer_id" }),
    __metadata("design:type", Number)
], Answer.prototype, "answerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_email" }),
    __metadata("design:type", String)
], Answer.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_name" }),
    __metadata("design:type", String)
], Answer.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "content", type: "text" }),
    __metadata("design:type", String)
], Answer.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Answer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Answer.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_deleted", default: false }),
    __metadata("design:type", Boolean)
], Answer.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inquiry_entity_1.Inquiry, (inquiry) => inquiry.answers),
    (0, typeorm_1.JoinColumn)({ name: "inquiry_id" }),
    __metadata("design:type", inquiry_entity_1.Inquiry)
], Answer.prototype, "inquiry", void 0);
exports.Answer = Answer = __decorate([
    (0, typeorm_1.Entity)("answers")
], Answer);
//# sourceMappingURL=answer.entity.js.map