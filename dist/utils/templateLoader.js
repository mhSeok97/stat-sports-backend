"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMailTemplate = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
let compiledTemplate = null;
const loadTemplate = async () => {
    if (!compiledTemplate) {
        const filePath = path_1.default.join(__dirname, "../templates", "mail.template.hbs");
        const templateSource = await fs_1.promises.readFile(filePath, "utf-8");
        compiledTemplate = handlebars_1.default.compile(templateSource);
    }
    return compiledTemplate;
};
const getMailTemplate = async (templateData) => {
    const template = await loadTemplate();
    return template(templateData);
};
exports.getMailTemplate = getMailTemplate;
//# sourceMappingURL=templateLoader.js.map