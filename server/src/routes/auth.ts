import { Router } from 'express'
import {
  forgotPassword,
  login,
  logout,
  me,
  refresh,
  register,
  resetPassword,
  verifyEmail,
} from '../controllers/authController.js'
import { requireAuth } from '../middleware/auth.js'
import { authRateLimiter } from '../middleware/rateLimit.js'
import { validateBody, validateQuery } from '../middleware/validate.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailQuerySchema,
} from '../validators/auth.js'

export const authRouter = Router()

authRouter.post(
  '/register',
  authRateLimiter,
  validateBody(registerSchema),
  asyncHandler(register),
)
authRouter.post('/login', authRateLimiter, validateBody(loginSchema), asyncHandler(login))
authRouter.post('/logout', asyncHandler(logout))
authRouter.post('/refresh', asyncHandler(refresh))
authRouter.get('/me', requireAuth, asyncHandler(me))
authRouter.post(
  '/forgot-password',
  authRateLimiter,
  validateBody(forgotPasswordSchema),
  asyncHandler(forgotPassword),
)
authRouter.post(
  '/reset-password',
  authRateLimiter,
  validateBody(resetPasswordSchema),
  asyncHandler(resetPassword),
)
authRouter.get(
  '/verify-email',
  validateQuery(verifyEmailQuerySchema),
  asyncHandler(verifyEmail),
)
