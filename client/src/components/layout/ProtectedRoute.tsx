import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function ProtectedRoute() {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />
  if (!user.onboardingComplete) return <Navigate to="/onboarding" replace />

  return <Outlet />
}

export function GuestRoute() {
  const { user } = useAuth()

  if (user?.onboardingComplete) return <Navigate to="/dashboard" replace />
  if (user) return <Navigate to="/onboarding" replace />

  return <Outlet />
}

export function OnboardingRoute() {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />
  if (user.onboardingComplete) return <Navigate to="/dashboard" replace />

  return <Outlet />
}
