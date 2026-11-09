import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { hashToken } from '../utils/tokens.js'

export type AccessPayload = {
  sub: string
  role: 'owner'
  businessId: string | null
}

export function signAccessToken(payload: AccessPayload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TOKEN_TTL as jwt.SignOptions['expiresIn'],
  })
}

export function signRefreshToken(userId: string) {
  return jwt.sign({ sub: userId, type: 'refresh' }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TOKEN_TTL as jwt.SignOptions['expiresIn'],
  })
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessPayload & jwt.JwtPayload
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as jwt.JwtPayload & {
    sub: string
    type: string
  }
}

export function hashRefreshToken(token: string) {
  return hashToken(token)
}
