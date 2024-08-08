"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiSuccess = apiSuccess;
exports.apiFail = apiFail;
const api_error_dto_1 = require("./api-error.dto");
const api_result_dto_1 = require("./api-result.dto");
function apiSuccess(body) {
    return new api_result_dto_1.ApiResult(true, body, null);
}
function apiFail(message, errorData) {
    return new api_result_dto_1.ApiResult(false, null, new api_error_dto_1.ApiError(message, errorData));
}
//# sourceMappingURL=api-util.dto.js.map