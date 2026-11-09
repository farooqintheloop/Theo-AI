import type { Request, Response } from 'express'
import { env } from '../config/env.js'
import { User } from '../models/User.js'
import { hashPassword, verifyPassword } from '../services/passwordService.js'
import {
  hashRefreshToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../services/tokenService.js'
import {
  REFRESH_COOKIE,
  clearAuthCookies,
  setAuthCookies,
} from '../utils/cookies.js'
import { AppError } from '../utils/AppError.js'
import { createRandomToken, hashToken } from '../utils/tokens.js'

const VERIFY_TTL_MS = 24 * 60 * 60 * 1000
const RESET_TTL_MS = 60 * 60 * 1000

function publicUser(user: {
  _id: { toString(): string }
  email: string
  emailVerified: boolean
  role: 'owner'
  businessId?: { toString(): string } | null
}) {
  return {
    id: user._id.toString(),
    email: user.email,
    emailVerified: user.emailVerified,
    role: user.role,
    businessId: user.businessId ? user.businessId.toString() : null,
  }
}

function issueSession(
  res: Response,
  user: {
    _id: { toString(): string }
    email: string
    emailVerified: boolean
    role: 'owner'
    businessId?: { toString(): string } | null
  },
) {
  const payload = {
    sub: user._id.toString(),
    role: user.role,
    businessId: user.businessId ? user.businessId.toString() : null,
  }
  const accessToken = signAccessToken(payload)
  const refreshToken = signRefreshToken(user._id.toString())
  setAuthCookies(res, accessToken, refreshToken)
  return { accessToken, refreshToken }
}

function logDevToken(kind: 'verify' | 'reset', email: string, token: string) {
  if (env.NODE_ENV === 'production') return
  const path =
    kind === 'verify'
      ? `${env.FRONTEND_URL}/verify-email?token=${token}`
      : `${env.FRONTEND_URL}/reset-password?token=${token}`
  console.log(`[dev ${kind} token for ${email}] ${path}`)
}

export async function register(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string }
  const existing = await User.findOne({ email })
  if (existing) {
    throw new AppError(409, 'An account with this email already exists', 'EMAIL_TAKEN')
  }

  const { token, hash } = createRandomToken()
  const user = await User.create({
    email,
    passwordHash: await hashPassword(password),
    role: 'owner',
    emailVerified: false,
    emailVerifyTokenHash: hash,
    emailVerifyExpires: new Date(Date.now() + VERIFY_TTL_MS),
  })

  logDevToken('verify', email, token)
  const { refreshToken } = issueSession(res, user)
  user.refreshTokenHash = hashRefreshToken(refreshToken)
  await user.save()

  res.status(201).json({ user: publicUser(user) })
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string }
  const user = await User.findOne({ email })
  if (!user || !(await verifyPassword(user.passwordHash, password))) {
    throw new AppError(401, 'Invalid email or password', 'INVALID_CREDENTIALS')
  }

  const { refreshToken } = issueSession(res, user)
  user.refreshTokenHash = hashRefreshToken(refreshToken)
  await user.save()

  res.json({ user: publicUser(user) })
}

export async function logout(req: Request, res: Response) {
  const refresh = req.cookies?.[REFRESH_COOKIE] as string | undefined
  if (refresh) {
    try {
      const payload = verifyRefreshToken(refresh)
      await User.findByIdAndUpdate(payload.sub, { refreshTokenHash: null })
    } catch {
      // still clear cookies
    }
  }
  clearAuthCookies(res)
  res.json({ ok: true as const })
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.[REFRESH_COOKIE] as string | undefined
  if (!token) {
    throw new AppError(401, 'Authentication required', 'UNAUTHENTICATED')
  }

  let payload: { sub: string; type?: string }
  try {
    payload = verifyRefreshToken(token)
  } catch {
    throw new AppError(401, 'Authentication required', 'UNAUTHENTICATED')
  }

  const user = await User.findById(payload.sub)
  if (!user?.refreshTokenHash || user.refreshTokenHash !== hashRefreshToken(token)) {
    throw new AppError(401, 'Authentication required', 'UNAUTHENTICATED')
  }

  const { refreshToken } = issueSession(res, user)
  user.refreshTokenHash = hashRefreshToken(refreshToken)
  await user.save()

  res.json({ user: publicUser(user) })
}

export async function me(req: Request, res: Response) {
  const user = await User.findById(req.auth?.userId)
  if (!user) {
    throw new AppError(401, 'Authentication required', 'UNAUTHENTICATED')
  }
  res.json({ user: publicUser(user) })
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body as { email: string }
  const user = await User.findOne({ email })
  if (user) {
    const { token, hash } = createRandomToken()
    user.passwordResetTokenHash = hash
    user.passwordResetExpires = new Date(Date.now() + RESET_TTL_MS)
    await user.save()
    logDevToken('reset', email, token)
  }
  res.json({ ok: true as const })
}

export async function resetPassword(req: Request, res: Response) {
  const { token, password } = req.body as { token: string; password: string }
  const hash = hashToken(token)
  const user = await User.findOne({
    passwordResetTokenHash: hash,
    passwordResetExpires: { $gt: new Date() },
  })
  if (!user) {
    throw new AppError(400, 'Reset link is invalid or expired', 'INVALID_TOKEN')
  }

  user.passwordHash = await hashPassword(password)
  user.passwordResetTokenHash = null
  user.passwordResetExpires = null
  user.refreshTokenHash = null
  await user.save()
  clearAuthCookies(res)
  res.json({ ok: true as const })
}

export async function verifyEmail(req: Request, res: Response) {
  const token = String(req.query.token ?? '')
  const hash = hashToken(token)
  const user = await User.findOne({
    emailVerifyTokenHash: hash,
    emailVerifyExpires: { $gt: new Date() },
  })
  if (!user) {
    throw new AppError(400, 'Verification link is invalid or expired', 'INVALID_TOKEN')
  }

  user.emailVerified = true
  user.emailVerifyTokenHash = null
  user.emailVerifyExpires = null
  await user.save()
  res.json({ ok: true as const })
}
