import { ApiError } from "./api-error.dto"
import { ApiResult } from "./api-result.dto"

export function apiSuccess<T>(body?: T): ApiResult<T> {
  return new ApiResult(true, body, null)
}

export function apiFail(message: string, errorData: any): ApiResult<any> {
  return new ApiResult(false, null, new ApiError(message, errorData))
}
