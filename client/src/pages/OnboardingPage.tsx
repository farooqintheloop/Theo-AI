import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'

const industries = ['Hotel', 'Restaurant'] as const

export function OnboardingPage() {
  const { completeOnboarding } = useAuth()
  const navigate = useNavigate()
  const [industry, setIndustry] = useState<(typeof industries)[number]>('Hotel')

  return (
    <div className="mx-auto flex min-h-svh max-w-xl flex-col bg-[#f4f2f7] px-5 py-8">
      <p className="text-xs font-semibold tracking-[0.18em] text-theo uppercase">
        Business onboarding
      </p>
      <h1 className="mt-2 text-2xl font-bold">Business Information</h1>
      <form
        className="mt-6 space-y-3"
        onSubmit={(event) => {
          event.preventDefault()
          completeOnboarding()
          navigate('/dashboard')
        }}
      >
        <Input placeholder="Business name" />
        <div className="grid grid-cols-2 gap-2">
          {industries.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setIndustry(item)}
              className={`h-11 rounded-xl text-sm font-medium ${
                industry === item
                  ? 'bg-theo text-white'
                  : 'bg-white text-theo-muted'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <Input placeholder="City / location" />
        <Input placeholder="Contact email" type="email" />
        <Input placeholder="Phone" />
        <Input placeholder="Opening hours" />
        <div className="pt-4">
          <Button variant="bar" type="submit">
            Continue to dashboard
          </Button>
        </div>
      </form>
    </div>
  )
}
