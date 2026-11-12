import { Notice } from '@/components/ui/Notice'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function BusinessSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-theo">Business Settings</h1>
      <Notice>
        Preview only — business details cannot be saved yet. Business database storage is
        not configured.
      </Notice>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Business information</h2>
        <Input placeholder="Business name (preview)" />
        <Input placeholder="Business email (preview)" type="email" />
        <Input placeholder="Business phone (preview)" />
        <Input placeholder="Business address (preview)" />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Operating hours</h2>
        <p className="text-xs text-theo-muted">
          Preview only — hours are not applied to calls or bookings.
        </p>
        <Input placeholder="Days and opening hours (preview)" />
      </section>

      <Button variant="bar">Save Changes (Preview)</Button>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Notification preferences</h2>
        <p className="text-xs text-theo-muted">Preview only — no notifications will be sent.</p>
        <label className="flex items-center justify-between py-2 text-sm">
          Email notifications
          <input type="checkbox" className="h-4 w-4 accent-theo" defaultChecked />
        </label>
        <label className="flex items-center justify-between py-2 text-sm">
          Conversation summaries
          <input type="checkbox" className="h-4 w-4 accent-theo" defaultChecked />
        </label>
      </section>

      <section>
        <h2 className="text-sm font-semibold">Integrations — Coming Soon</h2>
        <p className="mt-1 text-xs text-theo-muted">
          Phone, calendar and email integrations are not connected.
        </p>
      </section>
    </div>
  )
}
