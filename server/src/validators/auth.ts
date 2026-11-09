import { z } from 'zod'

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(128),
})

export const loginSchema = registerSchema

export const forgotPasswordSchema = z.object({
  email: z.email(),
})

export const resetPasswordSchema = z.object({
  token: z.string().min(16),
  password: z.string().min(8).max(128),
})

export const verifyEmailQuerySchema = z.object({
  token: z.string().min(16),
})
