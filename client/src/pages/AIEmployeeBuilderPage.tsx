import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function AIEmployeeBuilderPage() {
  return (
    <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[280px_1fr]">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-theo to-[#8b78ff] p-6 text-white shadow-lg">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
          AI Employee Builder
        </p>
        <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-bold text-theo">
          S
        </div>
        <h1 className="mt-4 text-2xl font-bold">Sophia</h1>
        <p className="mt-2 text-sm text-white/90">
          Hi! Welcome to Grand Plaza. How can I help with your reservation today?
        </p>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Customise your receptionist</h2>
        <p className="mt-1 text-sm text-theo-muted">
          Name, personality and responsibilities save to your business.
        </p>
        <div className="mt-6 space-y-4">
          <Input label="Name" defaultValue="Sophia" />
          <label className="block text-sm font-medium">
            Personality
            <textarea
              defaultValue="Warm, concise, and helpful hotel receptionist."
              className="mt-1.5 min-h-24 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-theo"
            />
          </label>
          <label className="block text-sm font-medium">
            Job responsibilities
            <textarea
              defaultValue="Answer FAQs, take booking requests, and capture guest enquiries."
              className="mt-1.5 min-h-24 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-theo"
            />
          </label>
          <Button>Save employee</Button>
        </div>
      </div>
    </div>
  )
}
