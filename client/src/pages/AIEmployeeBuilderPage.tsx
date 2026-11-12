import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function AIEmployeeBuilderPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Manage AI Staff</h1>
      <p className="text-sm text-theo-muted">
        Name, personality and responsibilities for your receptionist.
      </p>
      <div className="overflow-hidden rounded-2xl bg-theo p-6 text-white">
        <p className="text-xs tracking-[0.18em] uppercase text-white/70">Active</p>
        <h2 className="mt-2 text-2xl font-bold">Sophie</h2>
        <p className="mt-2 text-sm text-white/90">
          Hi! Welcome in. How can I help with your reservation today?
        </p>
      </div>
      <Input label="Name" defaultValue="Sophie" />
      <label className="block text-sm font-medium">
        Personality
        <textarea
          defaultValue="Warm, concise, and helpful hotel receptionist."
          className="mt-1.5 min-h-24 w-full rounded-xl bg-white px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-theo/15"
        />
      </label>
      <label className="block text-sm font-medium">
        Job responsibilities
        <textarea
          defaultValue="Answer FAQs, take booking requests, and capture guest enquiries."
          className="mt-1.5 min-h-24 w-full rounded-xl bg-white px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-theo/15"
        />
      </label>
      <Button variant="bar">Save employee</Button>
    </div>
  )
}
