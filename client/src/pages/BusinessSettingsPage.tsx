import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function BusinessSettingsPage() {
  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theo">
        Business settings
      </p>
      <h1 className="mt-2 text-2xl font-bold">Grand Plaza Hotel</h1>
      <p className="mt-1 text-sm text-theo-muted">Plan: Basic · Subscription managed in Phase 3</p>
      <div className="mt-6 space-y-4">
        <Input label="Business name" defaultValue="Grand Plaza Hotel" />
        <Input label="Contact email" defaultValue="hello@grandplaza.test" />
        <Input label="Opening hours" defaultValue="Mon–Sun 7:00–23:00" />
        <Input label="Timezone" defaultValue="Europe/London" />
        <Button>Save settings</Button>
      </div>
    </div>
  )
}
