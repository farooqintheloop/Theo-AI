import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { AuthLayout } from '@/components/layout/AuthLayout'
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
    <AuthLayout>
      <h1 className="mt-5 text-2xl font-bold">Set a new password</h1>
      <form className="mt-8 w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {!token ? <p className="text-sm text-red-500">This reset link is missing a token.</p> : null}
        {token && !done ? (
          <>
            <Input
              type="password"
              placeholder="New password"
              error={form.formState.errors.password?.message}
              {...form.register('password')}
            />
            <Input
              type="password"
              placeholder="Confirm password"
              error={form.formState.errors.confirmPassword?.message}
              {...form.register('confirmPassword')}
            />
          </>
        ) : null}
        {done ? <p className="text-sm text-theo-muted">Password updated. You can log in.</p> : null}
        {serverError ? <p className="text-sm text-red-500">{serverError}</p> : null}
        {token && !done ? (
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Update password
          </Button>
        ) : null}
        <Link to="/login" className="block text-center text-sm font-medium text-theo">
          Back to login
        </Link>
      </form>
    </AuthLayout>
  )
}
