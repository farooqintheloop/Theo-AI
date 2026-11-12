import { z } from 'zod'

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password is too long')
  .regex(/[0-9]/, 'Password must include at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must include at least one special character')

export const registerSchema = z.object({
  email: z.email('Enter a valid email'),
  password: passwordSchema,
})

export const loginSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

export const forgotPasswordSchema = z.object({
  email: z.email('Enter a valid email'),
})

export const resetPasswordSchema = z.object({
  token: z.string().min(16),
  password: passwordSchema,
})

export const verifyEmailQuerySchema = z.object({
  token: z.string().min(16),
})
