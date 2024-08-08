"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.InvalidTokenError = exports.AuthorizationError = void 0;
const httpError_exception_1 = require("exceptions/httpError.exception");
class AuthorizationError extends httpError_exception_1.HttpException {
    constructor(message) {
        super(400, message ? message : "X-AUTH-PAYLOAD header is missing", null);
    }
}
exports.AuthorizationError = AuthorizationError;
class InvalidTokenError extends httpError_exception_1.HttpException {
    constructor(message) {
        const invalidTokenErrorMessage = "X-AUTH-PAYLOAD header is invalid";
        super(400, message ? `${invalidTokenErrorMessage}: ${message}` : invalidTokenErrorMessage, null);
    }
}
exports.InvalidTokenError = InvalidTokenError;
class UnauthorizedError extends httpError_exception_1.HttpException {
    constructor(message) {
        const unauthorizedErrorMessage = "Unauthorized";
        super(401, message ? `${unauthorizedErrorMessage}: ${message}` : unauthorizedErrorMessage, null);
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=authorizationError.exception.js.map