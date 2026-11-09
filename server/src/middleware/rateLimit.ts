import rateLimit from 'express-rate-limit'

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts, try again later', code: 'RATE_LIMIT' },
})
