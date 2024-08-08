"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCommentCreationToAdmin = exports.sendCommentCreationMailToUser = exports.sendAnswerCreationMail = exports.sendInquiryCreationMailToAdmin = void 0;
const mailer_1 = require("./mailer");
const templateLoader_1 = require("./templateLoader");
const mail_config_1 = require("../config/mail.config");
const admin_1 = require("utils/admin");
const s3_1 = require("utils/s3");
const html_1 = require("utils/html");
const logger_1 = require("utils/logger");
const sendEmail = async (templateData, recipients, attachments) => {
    const mailer = new mailer_1.Mailer();
    try {
        const htmlContent = await (0, templateLoader_1.getMailTemplate)(templateData);
        const recipientsList = Array.isArray(recipients) ? recipients : [recipients];
        for (const recipient of recipientsList) {
            const mailOptions = {
                from: mail_config_1.MailConfig.from,
                to: recipient,
                subject: templateData.subject,
                html: htmlContent,
                attachments,
            };
            await mailer.sendMail(mailOptions);
        }
    } catch (error) {
        logger_1.logger.error(`Failed to send email: ${error.message}`);
    }
};
const sendInquiryCreationMailToAdmin = async (info, cookie) => {
    const imageUrls = (0, html_1.extractImageTags)(info.content);
    const attachments = await (0, s3_1.getImageBuffersFromS3)(info.id, imageUrls);
    const content = (0, html_1.replaceImageSrcWithCid)(info.content, attachments);
    const templateData = {
        subject: "[Monolake Console] 문의 게시글 등록 알림",
        subjectTitle: "Monolake Console 새로운 문의/게시글이 등록되었습니다.",
        inquiryTitle: info.title,
        content: content,
        inquiryLink: `${mail_config_1.MailConfig.homeUrl}/inquiry/${info.id}`,
    };
    const recipientsList = await (0, admin_1.getAdminMailList)(cookie);
    await sendEmail(templateData, recipientsList, attachments);
};
exports.sendInquiryCreationMailToAdmin = sendInquiryCreationMailToAdmin;
const sendAnswerCreationMail = async (info) => {
    const templateData = {
        subject: "[Monolake Console] 답변 등록 알림",
        subjectTitle: "Monolake Console 문의/답변에 답변이 등록되었습니다.",
        inquiryTitle: info.title,
        content: info.content,
        inquiryLink: `${mail_config_1.MailConfig.homeUrl}/inquiry/${info.id}`,
    };
    await sendEmail(templateData, info.ownerMail);
};
exports.sendAnswerCreationMail = sendAnswerCreationMail;
const sendCommentCreationMailToUser = async (info) => {
    const templateData = {
        subject: "[Monolake Console] 댓글 등록 알림",
        subjectTitle: "Monolake Console 문의/답변에 댓글이 등록되었습니다.",
        inquiryTitle: info.title,
        content: info.content,
        inquiryLink: `${mail_config_1.MailConfig.homeUrl}/inquiry/${info.id}`,
    };
    await sendEmail(templateData, info.ownerMail);
};
exports.sendCommentCreationMailToUser = sendCommentCreationMailToUser;
const sendCommentCreationToAdmin = async (info, cookie) => {
    const templateData = {
        subject: "[Monolake Console] 댓글 등록 알림",
        subjectTitle: "Monolake Console 문의/답변에 댓글이 등록되었습니다.",
        inquiryTitle: info.title,
        content: info.content,
        inquiryLink: `${mail_config_1.MailConfig.homeUrl}/inquiry/${info.id}`,
    };
    const recipientsList = await (0, admin_1.getAdminMailList)(cookie);
    await sendEmail(templateData, recipientsList);
};
exports.sendCommentCreationToAdmin = sendCommentCreationToAdmin;
// # sourceMappingURL=mailSender.js.map