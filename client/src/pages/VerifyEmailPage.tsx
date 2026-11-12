import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { authApi } from '@/services/auth'
import { getApiErrorMessage } from '@/services/http'

export function VerifyEmailPage() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const { user } = useAuth()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'idle' | 'working' | 'ok' | 'error'>(
    token ? 'working' : 'idle',
  )
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    let cancelled = false
    authApi
      .verifyEmail(token)
      .then(() => {
        if (!cancelled) setStatus('ok')
      })
      .catch((error) => {
        if (!cancelled) {
          setStatus('error')
          setMessage(getApiErrorMessage(error, 'This verification link is invalid or expired.'))
        }
      })
    return () => {
      cancelled = true
    }
  }, [token])

  return (
    <AuthLayout>
      <h1 className="mt-5 text-2xl font-bold">
        {status === 'ok' ? 'Email verified' : 'Check your inbox'}
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-6 text-theo-muted">
        {status === 'ok'
          ? 'Your email is verified. Continue to onboarding or log in.'
          : status === 'error'
            ? message
            : 'Email sending is not connected yet. Continue onboarding, or open a link with ?token= from the API log.'}
      </p>
      <div className="mt-8 w-full space-y-3">
        {user && !user.onboardingComplete ? (
          <Button onClick={() => navigate('/onboarding')}>Continue onboarding</Button>
        ) : (
          <Link to="/login">
            <Button>Go to login</Button>
          </Link>
        )}
      </div>
    </AuthLayout>
  )
}
