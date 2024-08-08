import { Middleware, ExpressErrorMiddlewareInterface, HttpError, NotFoundError } from "routing-controllers"
import { logger } from "utils/logger"
import { Request, Response, NextFunction } from "express"
import { apiFail } from "api/common/dto/api-util.dto"

@Middleware({ type: "after" })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: HttpError | Error, req: Request, res: Response, next: NextFunction) {
    try {
      const status: number = error instanceof HttpError ? error.httpCode : 500
      const message: string = error.message || "Something went wrong"

      this.logError(req, status, message)

      if (error instanceof NotFoundError) {
        res.status(404).json(apiFail("Resource not found", {}))
      } else {
        const errorDetails = error instanceof HttpError ? error["errObj"] || {} : {}
        res.status(status).json(apiFail(message, errorDetails))
      }
    } catch (err) {
      logger.error("[ErrorMiddleware] An error occurred in the error middleware.", err)
      next(err)
    }
  }

  private logError(req: Request, status: number, message: string) {
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`)
  }
}
