"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
const routing_controllers_1 = require("routing-controllers");
class HttpException extends routing_controllers_1.BadRequestError {
    constructor(status, message, errObj) {
        super(message);
        this.errType = "HttpException";
        this.status = status;
        this.message = message;
        this.errObj = errObj;
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=httpError.exception.js.map