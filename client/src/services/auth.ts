import { api } from '@/services/http'

export type AuthUserDto = {
  id: string
  email: string
  emailVerified: boolean
  role: 'owner'
  businessId: string | null
}

export type AuthResponse = {
  user: AuthUserDto
}

export const authApi = {
  register(payload: { email: string; password: string }) {
    return api.post<AuthResponse>('/auth/register', payload)
  },
  login(payload: { email: string; password: string }) {
    return api.post<AuthResponse>('/auth/login', payload)
  },
  logout() {
    return api.post<{ ok: true }>('/auth/logout')
  },
  refresh() {
    return api.post<AuthResponse>('/auth/refresh')
  },
  me() {
    return api.get<AuthResponse>('/auth/me')
  },
  forgotPassword(email: string) {
    return api.post<{ ok: true }>('/auth/forgot-password', { email })
  },
  resetPassword(payload: { token: string; password: string }) {
    return api.post<{ ok: true }>('/auth/reset-password', payload)
  },
  verifyEmail(token: string) {
    return api.get<{ ok: true }>('/auth/verify-email', { params: { token } })
  },
}
