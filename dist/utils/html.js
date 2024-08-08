"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceImageSrcWithCid = exports.extractImageTags = void 0;
const jsdom_1 = require("jsdom");
const logger_1 = require("utils/logger");
const extractImageTags = (html) => {
    const dom = new jsdom_1.JSDOM(html);
    const document = dom.window.document;
    const imageUrls = [];
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
        let src = img.getAttribute("src");
        if (!src) {
            src = img.getAttribute("alt");
        }
        if (src) {
            imageUrls.push(src);
        }
    });
    logger_1.logger.info(`Extracted image urls: ${imageUrls}`);
    return imageUrls;
};
exports.extractImageTags = extractImageTags;
const replaceImageSrcWithCid = (html, attachments) => {
    let modifiedHtml = html;
    attachments.forEach((attachment) => {
        if (attachment.cid) {
            const srcRegex = new RegExp(`src=""`, "g");
            const altRegex = new RegExp(`alt="${attachment.filename}"`, "g");
            modifiedHtml = modifiedHtml.replace(srcRegex, "");
            modifiedHtml = modifiedHtml.replace(altRegex, `src="cid:${attachment.cid}"`);
        }
    });
    return modifiedHtml;
};
exports.replaceImageSrcWithCid = replaceImageSrcWithCid;
//# sourceMappingURL=html.js.map