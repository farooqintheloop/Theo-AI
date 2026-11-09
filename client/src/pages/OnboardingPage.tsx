import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'

const industries = ['Hotel', 'Restaurant'] as const

export function OnboardingPage() {
  const { completeOnboarding } = useAuth()
  const navigate = useNavigate()
  const [industry, setIndustry] = useState<(typeof industries)[number]>('Hotel')

  function save() {
    completeOnboarding()
    navigate('/dashboard')
  }

  return (
    <PhoneFrame>
      <form
        className="flex flex-1 flex-col px-6 py-6"
        onSubmit={(event) => {
          event.preventDefault()
          save()
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-theo">
          Business onboarding
        </p>
        <h1 className="mt-2 text-3xl font-bold">Business Information</h1>
        <p className="mt-2 text-sm text-theo-muted">
          Saved to your account so progress is never lost.
        </p>
        <div className="mt-5 space-y-3 overflow-y-auto">
          <Input label="Business name" placeholder="Grand Plaza Hotel" />
          <div>
            <p className="mb-2 text-sm font-medium">Industry</p>
            <div className="grid grid-cols-2 gap-2">
              {industries.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setIndustry(item)}
                  className={`h-11 rounded-2xl border text-sm font-medium ${
                    industry === item
                      ? 'border-theo bg-theo-soft text-theo'
                      : 'border-zinc-200 bg-white text-theo-muted'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <Input label="City / location" placeholder="London" />
          <Input label="Contact email" type="email" placeholder="hello@business.com" />
          <Input label="Phone" type="tel" placeholder="+44 20 0000 0000" />
          <Input label="Opening hours" placeholder="Mon–Sun 7:00–23:00" />
          <Input label="Timezone" placeholder="Europe/London" />
        </div>
        <div className="pt-5">
          <Button type="submit">Continue to dashboard</Button>
        </div>
      </form>
    </PhoneFrame>
  )
}
