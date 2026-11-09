import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theo">
        My profile
      </p>
      <h1 className="mt-2 text-2xl font-bold">Owner account</h1>
      <div className="mt-6 space-y-4">
        <Input label="Email" defaultValue={user?.email ?? ''} readOnly />
        <Input label="Current password" type="password" placeholder="••••••••" />
        <Input label="New password" type="password" placeholder="At least 8 characters" />
        <Button>Save profile</Button>
      </div>
    </div>
  )
}
