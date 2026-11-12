import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { getApiErrorMessage } from '@/services/http'

const loginSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

const registerSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, 'Password must include at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must include at least one special character'),
})

type FormValues = {
  email: string
  password: string
}

export function AuthPage() {
  const location = useLocation()
  return <AuthForm key={location.pathname} />
}

function AuthForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const isLogin = location.pathname !== '/register'
  const [serverError, setServerError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(values: FormValues) {
    setServerError(null)
    setNotice(null)
    try {
      if (isLogin) {
        await login(values.email, values.password)
        navigate('/dashboard')
        return
      }
      const message = await register(values.email, values.password)
      setNotice(message)
      form.reset()
      navigate('/login', { replace: true, state: { notice: message } })
    } catch (error) {
      setServerError(getApiErrorMessage(error, isLogin ? 'Could not log in' : 'Could not register'))
    }
  }

  const loginNotice =
    notice ??
    (typeof location.state === 'object' &&
    location.state &&
    'notice' in location.state
      ? String((location.state as { notice?: string }).notice ?? '')
      : null)

  return (
    <AuthLayout>
      <h1 className="mt-5 text-2xl font-bold text-theo-ink">
        {isLogin ? 'Welcome Back' : 'Create your account'}
      </h1>
      <p className="mt-1 text-sm text-theo-muted">
        {isLogin
          ? 'Log in to manage your AI workforce'
          : 'Register your business and start training THEO'}
      </p>
      {isLogin && loginNotice ? (
        <p className="mt-4 text-sm font-medium text-emerald-600">{loginNotice}</p>
      ) : null}
      <form
        className="mt-8 w-full space-y-3 text-left"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <label className="relative block">
          <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="email"
            placeholder="Business Email"
            className="h-12 w-full rounded-xl bg-[#efeef3] pr-4 pl-11 text-sm outline-none focus:ring-4 focus:ring-theo/15"
            {...form.register('email')}
          />
        </label>
        {form.formState.errors.email ? (
          <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
        ) : null}
        <label className="relative block">
          <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="password"
            placeholder="Password"
            className="h-12 w-full rounded-xl bg-[#efeef3] pr-4 pl-11 text-sm outline-none focus:ring-4 focus:ring-theo/15"
            {...form.register('password')}
          />
        </label>
        {form.formState.errors.password ? (
          <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
        ) : null}
        {!isLogin ? (
          <p className="text-xs text-theo-muted">
            At least 8 characters, including one number and one special character.
          </p>
        ) : null}
        {serverError ? <p className="text-sm text-red-500">{serverError}</p> : null}
        {isLogin ? (
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-xs font-medium text-theo">
              Forgot Password?
            </Link>
          </div>
        ) : null}
        <div className="pt-4">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? isLogin
                ? 'Logging in…'
                : 'Creating account…'
              : isLogin
                ? 'Login'
                : 'Create Account'}
          </Button>
        </div>
      </form>
      <div className="mt-8 w-full">
        <p className="text-center text-xs tracking-wide text-theo-muted">OR</p>
        <button
          type="button"
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 text-sm font-medium text-theo-ink"
        >
          Continue with Google
          <span aria-hidden>→</span>
        </button>
        {isLogin ? (
          <p className="mt-6 text-center text-sm text-theo-muted">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-theo">
              Create Account
            </Link>
          </p>
        ) : (
          <p className="mt-6 text-center text-sm text-theo-muted">
            Already registered?{' '}
            <Link to="/login" className="font-semibold text-theo">
              Login
            </Link>
          </p>
        )}
      </div>
    </AuthLayout>
  )
}
