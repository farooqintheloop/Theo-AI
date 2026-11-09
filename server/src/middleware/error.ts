import type { NextFunction, Request, Response } from 'express'
import { env } from '../config/env.js'
import { AppError } from '../utils/AppError.js'

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  next(new AppError(404, 'Not found', 'NOT_FOUND'))
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message, code: error.code })
    return
  }

  console.error(error)
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL',
    ...(env.NODE_ENV === 'development' && error instanceof Error
      ? { detail: error.message }
      : {}),
  })
}
