import { useNavigate } from 'react-router-dom'
import { Notice } from '@/components/ui/Notice'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-theo">My Profile</h1>
      <Notice>
        Your name is saved to your account. Your sign-in email is shown below.
      </Notice>

      <section>
        <h2 className="text-sm font-semibold">Account information</h2>
        <p className="mt-4 text-sm font-medium">Name not set</p>
        <p className="mt-4 text-xs text-theo-muted">Sign-in email</p>
        <p className="text-sm">{user?.email ?? '—'}</p>
      </section>

      <Button variant="bar">Edit Profile</Button>

      <div>
        <p className="text-sm font-medium">Role: Not assigned — role management is not configured.</p>
        <p className="mt-1 text-xs text-theo-muted">
          Sign-in email changes are not available on this page.
        </p>
      </div>

      <Button
        variant="bar"
        onClick={() => {
          void logout().then(() => navigate('/login'))
        }}
      >
        Logout
      </Button>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Security</h2>
        <Button variant="secondary" className="rounded-xl border-zinc-200 text-theo-ink">
          Send password reset email
        </Button>
        <p className="text-xs text-theo-muted">
          Password reset is available by email. Two-factor authentication and session
          management are not implemented.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-semibold">Account settings — Coming Soon</h2>
        <p className="mt-1 text-xs text-theo-muted">
          Additional account preferences are not implemented.
        </p>
      </section>
    </div>
  )
}
