import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
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
    <PhoneFrame>
      <div className="flex flex-1 flex-col px-6 py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-theo">
          Authentication
        </p>
        <h1 className="mt-2 text-3xl font-bold">
          {status === 'ok' ? 'Email verified' : 'Check your inbox'}
        </h1>
        <p className="mt-3 text-sm leading-6 text-theo-muted">
          {status === 'ok'
            ? 'Your email is verified. Continue to onboarding or log in.'
            : status === 'error'
              ? message
              : 'We will send a verification link here once Resend is connected. For now you can continue onboarding, or open a link with ?token= from the API log.'}
        </p>
        <div className="mt-auto space-y-3">
          {user && !user.onboardingComplete ? (
            <Button onClick={() => navigate('/onboarding')}>Continue onboarding</Button>
          ) : (
            <Link to="/login">
              <Button>Go to login</Button>
            </Link>
          )}
          <Link to="/" className="block text-center text-sm text-theo">
            Back to home
          </Link>
        </div>
      </div>
    </PhoneFrame>
  )
}
