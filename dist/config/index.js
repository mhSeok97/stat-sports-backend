"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NCSR_ENDPOINT = exports.CORS_ORIGIN = exports.LOG_DIR = exports.PORT = exports.NODE_ENV = exports.LOG_FORMAT = exports.CORS_CREDENTIALS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || 'local'}` });
exports.CORS_CREDENTIALS = process.env.CORS_CREDENTIALS === 'true';
exports.LOG_FORMAT = process.env.LOG_FORMAT;
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.PORT = _a.PORT, exports.LOG_DIR = _a.LOG_DIR, exports.CORS_ORIGIN = _a.CORS_ORIGIN, exports.NCSR_ENDPOINT = _a.NCSR_ENDPOINT;
//# sourceMappingURL=index.js.map