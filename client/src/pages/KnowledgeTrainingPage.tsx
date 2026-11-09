import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/cn'

const tabs = ['Documents', 'FAQs', 'Rooms'] as const

const samples = [
  { tab: 'FAQs', title: 'Check-in', content: 'Check-in is from 3pm. Early arrival is subject to availability.' },
  { tab: 'FAQs', title: 'Breakfast', content: 'Breakfast is served 7am–10:30am in the courtyard.' },
  { tab: 'Documents', title: 'Cancellation policy', content: 'Free cancellation up to 24 hours before arrival.' },
  { tab: 'Rooms', title: 'Deluxe king', content: 'City view, king bed, from £210 per night. AI must not confirm availability.' },
]

export function KnowledgeTrainingPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('FAQs')

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-theo">
          Knowledge training
        </p>
        <h1 className="mt-2 text-2xl font-bold">Train Your AI</h1>
        <p className="mt-1 text-sm text-theo-muted">
          FAQs, services, hours and policies the receptionist can answer from.
        </p>
      </div>
      <div className="flex gap-2">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium',
              tab === item ? 'bg-theo text-white' : 'bg-white text-theo-muted shadow-sm',
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {samples
          .filter((item) => item.tab === tab)
          .map((item) => (
            <article key={item.title} className="rounded-3xl bg-white p-5 shadow-sm">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-theo-muted">{item.content}</p>
            </article>
          ))}
      </div>
      <form
        className="space-y-4 rounded-3xl bg-white p-5 shadow-sm"
        onSubmit={(event) => event.preventDefault()}
      >
        <Input label="Title" placeholder="Parking" />
        <label className="block text-sm font-medium">
          Content
          <textarea
            placeholder="Valet parking is available overnight for £25."
            className="mt-1.5 min-h-28 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-theo"
          />
        </label>
        <Button type="submit">Add knowledge</Button>
      </form>
    </div>
  )
}
