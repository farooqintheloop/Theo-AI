import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean }

const RENDER_API_URL = 'https://theo-api-cm6y.onrender.com/api'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || RENDER_API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

let refreshInFlight: Promise<void> | null = null

function isAuthSkip(url?: string) {
  if (!url) return false
  return (
    url.includes('/auth/refresh') ||
    url.includes('/auth/login') ||
    url.includes('/auth/register')
  )
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined
    const status = error.response?.status

    if (!original || status !== 401 || original._retry || isAuthSkip(original.url)) {
      return Promise.reject(error)
    }

    original._retry = true

    try {
      if (!refreshInFlight) {
        refreshInFlight = api
          .post('/auth/refresh')
          .then(() => undefined)
          .finally(() => {
            refreshInFlight = null
          })
      }
      await refreshInFlight
      return api(original)
    } catch (refreshError) {
      return Promise.reject(refreshError)
    }
  },
)

export function getApiErrorMessage(error: unknown, fallback = 'Something went wrong') {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data as { message?: string } | undefined
    return message?.message ?? error.message ?? fallback
  }
  if (error instanceof Error) return error.message
  return fallback
}
