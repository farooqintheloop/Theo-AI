import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
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
    <PhoneFrame>
      <form
        className="flex flex-1 flex-col px-6 py-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold">Forgot password</h1>
        <p className="mt-2 text-sm text-theo-muted">
          {done
            ? 'If that email exists, a reset token was created. Email sending is not enabled yet — check the API server log in development.'
            : 'Enter the email on your THEO account.'}
        </p>
        {!done ? (
          <div className="mt-8">
            <Input
              label="Email"
              type="email"
              placeholder="you@business.com"
              error={form.formState.errors.email?.message}
              {...form.register('email')}
            />
          </div>
        ) : null}
        {serverError ? (
          <p className="mt-3 text-sm text-red-500">{serverError}</p>
        ) : null}
        <div className="mt-auto space-y-3">
          {!done ? (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Sending…' : 'Send reset link'}
            </Button>
          ) : null}
          <Link to="/login" className="block text-center text-sm text-theo">
            Back to login
          </Link>
        </div>
      </form>
    </PhoneFrame>
  )
}
