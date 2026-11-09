import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'

const schema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'At least 8 characters'),
})

type FormValues = z.infer<typeof schema>

export function AuthPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const isLogin = location.pathname === '/login'

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  function onSubmit(values: FormValues) {
    if (isLogin) {
      login(values.email)
      navigate('/dashboard')
      return
    }
    register(values.email)
    navigate('/verify-email')
  }

  return (
    <PhoneFrame>
      <div className="flex gap-6 px-6 pt-5 text-sm font-medium">
        <Link
          to="/login"
          className={
            isLogin
              ? 'border-b-2 border-theo pb-2 text-theo'
              : 'text-theo-muted'
          }
        >
          Login
        </Link>
        <Link
          to="/register"
          className={
            !isLogin
              ? 'border-b-2 border-theo pb-2 text-theo'
              : 'text-theo-muted'
          }
        >
          Sign up
        </Link>
      </div>
      <form
        className="flex flex-1 flex-col px-6 pb-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="mt-8 text-3xl font-bold">
          {isLogin ? 'Welcome Back' : 'Create your account'}
        </h1>
        <p className="mt-2 text-sm text-theo-muted">
          {isLogin
            ? 'Log in to manage your AI employee.'
            : 'Register your hotel or restaurant and start onboarding.'}
        </p>
        <div className="mt-8 space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@business.com"
            error={form.formState.errors.email?.message}
            {...form.register('email')}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={form.formState.errors.password?.message}
            {...form.register('password')}
          />
        </div>
        {isLogin ? (
          <Link
            to="/forgot-password"
            className="mt-3 text-right text-xs font-medium text-theo"
          >
            Forgot password?
          </Link>
        ) : (
          <p className="mt-3 text-xs leading-5 text-theo-muted">
            By signing up you agree to our{' '}
            <Link to="/terms" className="font-medium text-theo">
              Terms
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="font-medium text-theo">
              Privacy Policy
            </Link>
            .
          </p>
        )}
        <div className="mt-8">
          <Button type="submit">{isLogin ? 'Log in' : 'Create account'}</Button>
        </div>
      </form>
    </PhoneFrame>
  )
}
