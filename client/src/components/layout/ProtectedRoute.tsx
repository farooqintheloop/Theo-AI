import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

function AuthLoading() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-[#f4f2f7] text-sm text-theo-muted">
      Checking session…
    </div>
  )
}

export function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) return <AuthLoading />
  if (!user) return <Navigate to="/login" replace />
  if (!user.onboardingComplete) return <Navigate to="/onboarding" replace />

  return <Outlet />
}

export function GuestRoute() {
  const { user, loading } = useAuth()

  if (loading) return <AuthLoading />
  if (user?.onboardingComplete) return <Navigate to="/dashboard" replace />
  if (user) return <Navigate to="/onboarding" replace />

  return <Outlet />
}

export function OnboardingRoute() {
  const { user, loading } = useAuth()

  if (loading) return <AuthLoading />
  if (!user) return <Navigate to="/login" replace />
  if (user.onboardingComplete) return <Navigate to="/dashboard" replace />

  return <Outlet />
}
