import { HttpException } from "exceptions/httpError.exception";

export class AuthorizationError extends HttpException {
  constructor(message?: string) {
    super(400, message ? message : "X-AUTH-PAYLOAD header is missing", null);
  }
}

export class InvalidTokenError extends HttpException {
  constructor(message?: string) {
    const invalidTokenErrorMessage = "X-AUTH-PAYLOAD header is invalid";
    super(400, message ? `${invalidTokenErrorMessage}: ${message}` : invalidTokenErrorMessage, null);
  }
}

export class UnauthorizedError extends HttpException {
  constructor(message?: string) {
    const unauthorizedErrorMessage = "Unauthorized";
    super(401, message ? `${unauthorizedErrorMessage}: ${message}` : unauthorizedErrorMessage, null);
  }
}
