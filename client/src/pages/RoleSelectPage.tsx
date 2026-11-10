import { Building2, Hotel } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/layout/Logo'
import { useAuth } from '@/hooks/useAuth'

export function RoleSelectPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  function openOwner() {
    if (user?.onboardingComplete) navigate('/dashboard')
    else if (user) navigate('/onboarding')
    else navigate('/owner')
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-[#0c0a14] px-4 py-10">
      <div className="w-full max-w-3xl">
        <div className="mb-10 flex justify-center">
          <Logo light />
        </div>
        <h1 className="text-center text-3xl font-bold text-white md:text-4xl">
          How do you want to use THEO?
        </h1>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-white/70">
          Guests browse hotels and talk to each receptionist. Owners manage their
          AI employee and dashboard.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => navigate('/hotels')}
            className="rounded-3xl border border-white/10 bg-white p-8 text-left shadow-xl transition hover:-translate-y-0.5 hover:border-theo"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-theo-soft text-theo">
              <Hotel className="h-6 w-6" />
            </span>
            <p className="mt-5 text-2xl font-bold text-theo-ink">Customer</p>
            <p className="mt-2 text-sm leading-6 text-theo-muted">
              See hotel listings, open a property, and chat with its AI receptionist.
            </p>
          </button>
          <button
            type="button"
            onClick={openOwner}
            className="rounded-3xl border border-white/10 bg-theo p-8 text-left text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-theo-dark"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Building2 className="h-6 w-6" />
            </span>
            <p className="mt-5 text-2xl font-bold">Owner</p>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Log in to train your AI employee, knowledge, and business dashboard.
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
