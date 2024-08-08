"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = exports.logger = void 0;
const config_1 = require("config");
const fs_1 = require("fs");
const path_1 = require("path");
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const logDir = (0, path_1.join)(__dirname, config_1.LOG_DIR);
if (!(0, fs_1.existsSync)(logDir)) {
    (0, fs_1.mkdirSync)(logDir);
}
const logFormat = winston_1.default.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level} | ${message}`);
const logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), winston_1.default.format.json()),
    transports: [
        new winston_daily_rotate_file_1.default({
            level: "debug",
            datePattern: "YYYY-MM-DD",
            dirname: logDir + "/debug",
            filename: "%DATE%.log",
            maxFiles: 30,
            json: true,
            zippedArchive: true,
        }),
        new winston_daily_rotate_file_1.default({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logDir + "/error",
            filename: "%DATE%.log",
            maxFiles: 30,
            handleExceptions: true,
            json: true,
            zippedArchive: true,
        }),
    ],
});
exports.logger = logger;
logger.add(new winston_1.default.transports.Console({
    format: winston_1.default.format.combine(winston_1.default.format.splat(), winston_1.default.format.colorize(), winston_1.default.format.simple(), logFormat),
}));
const stream = {
    write: (message) => {
        logger.info(message.substring(0, message.lastIndexOf("\n")));
    },
};
exports.stream = stream;
//# sourceMappingURL=logger.js.map