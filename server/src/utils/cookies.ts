import type { CookieOptions, Response } from 'express'
import { env, isProd } from '../config/env.js'

export const ACCESS_COOKIE = 'theo_access'
export const REFRESH_COOKIE = 'theo_refresh'

const accessMaxAgeMs = 15 * 60 * 1000
const refreshMaxAgeMs = 7 * 24 * 60 * 60 * 1000

function baseCookie(): CookieOptions {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
  }
}

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  res.cookie(ACCESS_COOKIE, accessToken, { ...baseCookie(), maxAge: accessMaxAgeMs })
  res.cookie(REFRESH_COOKIE, refreshToken, { ...baseCookie(), maxAge: refreshMaxAgeMs })
}

export function clearAuthCookies(res: Response) {
  res.clearCookie(ACCESS_COOKIE, baseCookie())
  res.clearCookie(REFRESH_COOKIE, baseCookie())
}

export function cookieTtlLabel() {
  return { access: env.ACCESS_TOKEN_TTL, refresh: env.REFRESH_TOKEN_TTL }
}
