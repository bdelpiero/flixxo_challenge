import { Request, Response } from "express"
import { AppError } from "../utils/AppError"

export const errorHandler = (error: AppError, req: Request, res: Response) => {
  error.status = error.status || "error"
  error.statusCode = error.statusCode || 500

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  })
}
