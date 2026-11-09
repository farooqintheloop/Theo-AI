import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthUser } from '@/types/auth'

type AuthContextValue = {
  user: AuthUser | null
  login: (email: string) => void
  register: (email: string) => void
  completeOnboarding: () => void
  logout: () => void
}

const STORAGE_KEY = 'theo-auth'
const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser)

  const persist = useCallback((next: AuthUser | null) => {
    setUser(next)
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    else localStorage.removeItem(STORAGE_KEY)
  }, [])

  const login = useCallback(
    (email: string) => {
      persist({ email, onboardingComplete: true })
    },
    [persist],
  )

  const register = useCallback(
    (email: string) => {
      persist({ email, onboardingComplete: false })
    },
    [persist],
  )

  const completeOnboarding = useCallback(() => {
    setUser((current) => {
      if (!current) return current
      const next = { ...current, onboardingComplete: true }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const logout = useCallback(() => persist(null), [persist])

  const value = useMemo(
    () => ({ user, login, register, completeOnboarding, logout }),
    [user, login, register, completeOnboarding, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
