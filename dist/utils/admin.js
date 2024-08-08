"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminMailList = void 0;
const authz_config_1 = require("config/authz.config");
const mail_config_1 = require("config/mail.config");
const axiosUtil_1 = require("utils/axiosUtil");
const logger_1 = require("utils/logger");
const getAdminMailList = async (cookie) => {
    const axiosConfig = {
        method: "get",
        url: (0, authz_config_1.getAuthzConfig)().getUrlFetchingAdminUser(),
    };
    try {
        const res = await (0, axiosUtil_1.axiosWithCookie)(axiosConfig, cookie);
        if (res.data.success) {
            const mailList = res.data.data.map((admin) => {
                return admin.email;
            });
            logger_1.logger.info(`Admin email list: ${mailList}`);
            return mailList;
        } else {
            logger_1.logger.error(`Failed to get admin email list: ${res.data.message}`);
            return mail_config_1.MailConfig.baseAdminEmailList;
        }
    } catch (error) {
        logger_1.logger.error(`Failed to get admin email list: ${error.message}`);
        return mail_config_1.MailConfig.baseAdminEmailList;
    }
};
exports.getAdminMailList = getAdminMailList;
// # sourceMappingURL=admin.js.map