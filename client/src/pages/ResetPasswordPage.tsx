import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { authApi } from '@/services/auth'
import { getApiErrorMessage } from '@/services/http'

const schema = z
  .object({
    password: z.string().min(8, 'At least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm your password'),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof schema>

export function ResetPasswordPage() {
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const [done, setDone] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  async function onSubmit(values: FormValues) {
    setServerError(null)
    try {
      await authApi.resetPassword({ token, password: values.password })
      setDone(true)
    } catch (error) {
      setServerError(getApiErrorMessage(error, 'Could not reset password'))
    }
  }

  return (
    <PhoneFrame>
      <form
        className="flex flex-1 flex-col px-6 py-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold">Set a new password</h1>
        <p className="mt-2 text-sm text-theo-muted">
          {done
            ? 'Your password has been updated. You can log in with it once the live session is connected.'
            : 'Use the token from the reset link.'}
        </p>
        {!token ? (
          <p className="mt-6 text-sm text-red-500">This reset link is missing a token.</p>
        ) : null}
        {token && !done ? (
          <div className="mt-8 space-y-4">
            <Input
              label="New password"
              type="password"
              error={form.formState.errors.password?.message}
              {...form.register('password')}
            />
            <Input
              label="Confirm password"
              type="password"
              error={form.formState.errors.confirmPassword?.message}
              {...form.register('confirmPassword')}
            />
          </div>
        ) : null}
        {serverError ? (
          <p className="mt-3 text-sm text-red-500">{serverError}</p>
        ) : null}
        <div className="mt-auto space-y-3">
          {token && !done ? (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Saving…' : 'Update password'}
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
