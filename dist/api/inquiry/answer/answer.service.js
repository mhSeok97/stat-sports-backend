"use strict";
let __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    let c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (let i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryAnswerService = void 0;
const answer_entity_1 = require("./entity/answer.entity");
const typedi_1 = require("typedi");
const AnswerOut_dto_1 = require("api/inquiry/answer/dto/AnswerOut.dto");
const answer_repository_1 = require("api/inquiry/answer/repository/answer.repository");
const routing_controllers_1 = require("routing-controllers");
let InquiryAnswerService = class InquiryAnswerService {
    async findAnswerOrThrow(inquiryId) {
        const answer = await answer_repository_1.AnswerRepository.findExistingOneAnswerByInquiryId(inquiryId);
        if (!answer) {
            throw new routing_controllers_1.NotFoundError(`Answer not found: answerId=${inquiryId}`);
        }
        return answer;
    }
    async getAnswers(inquiry) {
        const answers = await answer_repository_1.AnswerRepository.findExistingAnswersByInquiryId(inquiry.inquiryId);
        return answers.map((answer) => this.convertAnswerToAnswerOutDto(answer));
    }
    async createAnswer(inquiry, userEmail, userName, dto) {
        const newAnswer = new answer_entity_1.Answer();
        newAnswer.inquiry = inquiry;
        newAnswer.userEmail = userEmail;
        newAnswer.userName = userName;
        newAnswer.content = dto.content;
        const savedAnswer = await answer_repository_1.AnswerRepository.save(newAnswer);
        return this.convertAnswerToAnswerOutDto(savedAnswer);
    }
    convertAnswerToAnswerOutDto(answer) {
        const answerDto = new AnswerOut_dto_1.AnswerOutDto();
        answerDto.answerId = answer.answerId;
        answerDto.content = answer.content;
        answerDto.userEmail = answer.userEmail;
        answerDto.userName = answer.userName;
        answerDto.isDeleted = answer.isDeleted;
        answerDto.createdAt = answer.createdAt;
        answerDto.updatedAt = answer.updatedAt;
        return answerDto;
    }
    async deleteAnswer(inquiry) {
        const answer = await this.findAnswerOrThrow(inquiry.inquiryId);
        await answer_repository_1.AnswerRepository.updateDeleteFlagTrue(answer.answerId);
    }
    async updateAnswer(inquiryId, data) {
        const answer = await this.findAnswerOrThrow(inquiryId);
        answer.content = data.content;
        const updatedAnswer = await answer_repository_1.AnswerRepository.save(answer);
        return this.convertAnswerToAnswerOutDto(updatedAnswer);
    }
};
exports.InquiryAnswerService = InquiryAnswerService;
exports.InquiryAnswerService = InquiryAnswerService = __decorate([
    (0, typedi_1.Service)()
], InquiryAnswerService);
// # sourceMappingURL=answer.service.js.map