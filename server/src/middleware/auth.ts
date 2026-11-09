import type { NextFunction, Request, Response } from 'express'
import { ACCESS_COOKIE } from '../utils/cookies.js'
import { AppError } from '../utils/AppError.js'
import { verifyAccessToken } from '../services/tokenService.js'

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.[ACCESS_COOKIE] as string | undefined
  if (!token) {
    throw new AppError(401, 'Authentication required', 'UNAUTHENTICATED')
  }

  try {
    const payload = verifyAccessToken(token)
    req.auth = {
      userId: payload.sub,
      businessId: payload.businessId,
      role: payload.role,
    }
    next()
  } catch {
    throw new AppError(401, 'Authentication required', 'UNAUTHENTICATED')
  }
}
