"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mail_config_1 = require("../config/mail.config");
const logger_1 = require("./logger");
class Mailer {
    constructor() {
        const transporterOptions = {
            host: mail_config_1.MailConfig.host,
            port: mail_config_1.MailConfig.port,
            secure: false,
            tls: {
                rejectUnauthorized: true,
            },
            debug: mail_config_1.MailConfig.debug,
            logger: mail_config_1.MailConfig.logger,
        };
        this.transporter = nodemailer_1.default.createTransport(transporterOptions);
    }
    async sendMail(mailOptions) {
        try {
            const info = await this.transporter.sendMail(mailOptions);
            logger_1.logger.info(`Email sent: ${info.messageId}`);
            return info;
        }
        catch (error) {
            logger_1.logger.error(`Failed to send email: ${error instanceof Error ? error.message : error}`);
            throw error;
        }
    }
}
exports.Mailer = Mailer;
//# sourceMappingURL=mailer.js.map