import type { NextFunction, Request, Response } from 'express'
import type { ZodType } from 'zod'
import { AppError } from '../utils/AppError.js'

export function validateBody(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      throw new AppError(400, 'Invalid request body', 'VALIDATION_ERROR')
    }
    req.body = result.data
    next()
  }
}

export function validateQuery(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query)
    if (!result.success) {
      throw new AppError(400, 'Invalid query', 'VALIDATION_ERROR')
    }
    next()
  }
}
