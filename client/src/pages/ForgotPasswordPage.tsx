import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { authApi } from '@/services/auth'
import { getApiErrorMessage } from '@/services/http'

const schema = z.object({
  email: z.email('Enter a valid email'),
})

type FormValues = z.infer<typeof schema>

export function ForgotPasswordPage() {
  const [done, setDone] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  })

  async function onSubmit(values: FormValues) {
    setServerError(null)
    try {
      await authApi.forgotPassword(values.email)
      setDone(true)
    } catch (error) {
      setServerError(getApiErrorMessage(error, 'Could not start a password reset'))
    }
  }

  return (
    <AuthLayout>
      <h1 className="mt-5 text-2xl font-bold">Forgot password</h1>
      <p className="mt-2 max-w-sm text-sm text-theo-muted">
        {done
          ? 'If that email exists, a reset was started. Email sending is not enabled yet.'
          : 'Enter the business email on your THEO account.'}
      </p>
      <form className="mt-8 w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {!done ? (
          <Input
            placeholder="Business Email"
            type="email"
            error={form.formState.errors.email?.message}
            {...form.register('email')}
          />
        ) : null}
        {serverError ? <p className="text-sm text-red-500">{serverError}</p> : null}
        {!done ? (
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Send reset link
          </Button>
        ) : null}
        <Link to="/login" className="block text-center text-sm font-medium text-theo">
          Back to login
        </Link>
      </form>
    </AuthLayout>
  )
}
