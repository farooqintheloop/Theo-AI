import { Link } from 'react-router-dom'
import { Logo } from '@/components/layout/Logo'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { Button } from '@/components/ui/Button'

const steps = [
  { title: 'Sign up', body: 'Create your owner account in minutes.' },
  { title: 'Train THEO', body: 'Add hours, FAQs and your AI employee.' },
  { title: 'Embed chat', body: 'Put the widget on your hotel or restaurant site.' },
]

export function LandingPage() {
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between px-5 py-4">
        <Logo />
        <Link to="/login" className="text-sm font-medium text-theo">
          Log in
        </Link>
      </div>
      <div className="flex flex-1 flex-col px-6 pb-2">
        <p className="mt-4 max-w-[16ch] text-[34px] font-bold leading-[1.1] text-theo-ink">
          Meet Your Next AI Employee.
        </p>
        <p className="mt-4 text-sm leading-6 text-theo-muted">
          Create a 24/7 AI receptionist for your hotel or restaurant. Answers
          questions, captures enquiries, and helps with bookings.
        </p>
        <div className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-theo to-[#8b78ff] p-5 text-white shadow-lg shadow-theo/25">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80">
            Preview
          </p>
          <p className="mt-3 text-lg font-semibold">Sophia is online</p>
          <p className="mt-1 text-sm text-white/90">
            “Welcome to Grand Plaza. How can I help with your stay?”
          </p>
        </div>
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theo">
            How THEO Works
          </p>
          <ol className="mt-3 space-y-3">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-theo-soft text-xs font-bold text-theo">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-theo-ink">{step.title}</p>
                  <p className="text-xs text-theo-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-8">
          <Link to="/register">
            <Button>Get started</Button>
          </Link>
        </div>
      </div>
    </PhoneFrame>
  )
}
