import { FileUp, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

const tabs = ['Documents', 'FAQs', 'Website', 'Policies'] as const

const faqs = [
  {
    q: 'What are your check-in times?',
    a: 'Standard check-in is at 3:00 PM. Early check-in is subject to availability.',
  },
  {
    q: 'Do you offer airport shuttles?',
    a: 'Yes, we provide a complimentary shuttle service every 30 minutes.',
  },
]

export function KnowledgeTrainingPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Documents')

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Train Your AI</h1>
        <p className="mt-1 text-sm text-theo-muted">Build your business knowledge base</p>
      </div>

      <div className="grid grid-cols-4 rounded-full bg-zinc-200/70 p-1">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              'rounded-full py-2.5 text-xs font-semibold sm:text-sm',
              tab === item ? 'bg-zinc-300 text-theo-ink' : 'text-theo-muted',
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === 'Documents' || tab === 'Policies' ? (
        <div className="space-y-3">
          <p className="flex items-center gap-2 text-sm text-theo-muted">
            <FileUp className="h-4 w-4" />
            Upload PDFs, Docs, or Text files.
          </p>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white py-12 text-center">
            <input type="file" className="hidden" />
            <span className="text-theo">Click to upload files</span>
            <span className="mt-1 text-xs text-theo-muted">Max 10MB per file · PDF, DOCX, TXT</span>
          </label>
          <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm shadow-sm">
            <span>Company_Handbook.pdf</span>
            <Trash2 className="h-4 w-4 text-theo-muted" />
          </div>
        </div>
      ) : null}

      {tab === 'FAQs' || tab === 'Documents' ? (
        <section className="space-y-3">
          <h2 className="font-semibold">Frequently Asked Questions</h2>
          <p className="text-sm text-theo-muted">Common customer queries and answers</p>
          {faqs.map((item) => (
            <article key={item.q} className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="font-medium">{item.q}</p>
              <p className="mt-2 text-sm text-theo-muted">{item.a}</p>
            </article>
          ))}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 py-3 text-sm font-medium text-theo"
          >
            <Plus className="h-4 w-4" />
            Add New FAQ
          </button>
        </section>
      ) : null}

      {tab === 'Website' || tab === 'Documents' ? (
        <section className="rounded-2xl bg-theo-soft p-4">
          <h2 className="text-sm font-semibold">Website URL</h2>
          <p className="mt-1 text-xs text-theo-muted">Extract data directly from your site</p>
          <div className="mt-3 flex gap-2">
            <input
              placeholder="https://your-hotel.com"
              className="h-11 flex-1 rounded-xl bg-white px-4 text-sm outline-none"
            />
            <Button className="h-11 w-auto rounded-xl px-5">Crawl</Button>
          </div>
          <p className="mt-2 text-xs text-theo-muted">
            THEO will scan up to 50 pages for business info.
          </p>
        </section>
      ) : null}

      <section>
        <h2 className="font-semibold">Custom Instructions</h2>
        <p className="mt-1 text-sm text-theo-muted">Specific behavioral logic for your AI</p>
        <textarea
          placeholder="Always greet guests by name when known. Never confirm a booking is complete."
          className="mt-3 min-h-28 w-full rounded-2xl bg-white px-4 py-3 text-sm outline-none ring-0 focus:ring-4 focus:ring-theo/15"
        />
      </section>
    </div>
  )
}
