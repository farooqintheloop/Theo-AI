import { Mail, Phone, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'

const tabs = ['All', 'Calls', 'Messages', 'Emails'] as const

const conversations = [
  {
    name: 'Sarah Jenkins',
    preview: "I'd like to book a room for two nights starting Friday.",
    time: '10:24 AM',
    channel: 'Calls',
    handover: false,
  },
  {
    name: 'Mark Thompson',
    preview: "The AI couldn't answer my question about the local parking policy.",
    time: '09:15 AM',
    channel: 'Calls',
    handover: true,
  },
  {
    name: 'Elena Rodriguez',
    preview: 'Confirmation of my dinner reservation at 7PM tonight.',
    time: 'Yesterday',
    channel: 'Emails',
    handover: false,
  },
  {
    name: 'Hotel Guest #402',
    preview: 'Requesting extra towels for room 402 please.',
    time: 'Yesterday',
    channel: 'Calls',
    handover: false,
  },
  {
    name: 'David Chen',
    preview: 'Do you have any vegan options available on the lunch menu?',
    time: '2 days ago',
    channel: 'Calls',
    handover: false,
  },
  {
    name: 'Support Ticket #882',
    preview: 'Escalating query regarding corporate booking rates.',
    time: '2 days ago',
    channel: 'Emails',
    handover: true,
  },
]

export function ConversationsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('All')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    return conversations.filter((item) => {
      const matchTab = tab === 'All' || item.channel === tab
      const matchQuery = `${item.name} ${item.preview}`.toLowerCase().includes(query.toLowerCase())
      return matchTab && matchQuery
    })
  }, [tab, query])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Conversations</h1>
        <p className="text-sm text-theo-muted">Unified inbox for your AI workforce</p>
      </div>

      <label className="relative block">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-theo-muted" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search transcripts"
          className="h-11 w-full rounded-xl bg-white pr-4 pl-10 text-sm outline-none focus:ring-4 focus:ring-theo/15"
        />
      </label>

      <div className="grid grid-cols-4 gap-1 rounded-full bg-zinc-200/60 p-1">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              'rounded-full py-2 text-xs font-semibold sm:text-sm',
              tab === item ? 'bg-zinc-300 text-theo-ink' : 'text-theo-muted',
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-theo-muted">Recent Activity</h2>
        <ul className="space-y-3">
          {visible.map((item) => (
            <li key={item.name}>
              <button
                type="button"
                className="flex w-full items-start gap-3 rounded-2xl bg-white px-4 py-3 text-left shadow-sm"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#efeef3] text-theo-muted">
                  {item.channel === 'Emails' ? (
                    <Mail className="h-4 w-4" />
                  ) : (
                    <Phone className="h-4 w-4" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold">{item.name}</p>
                    <span className="shrink-0 text-xs text-theo-muted">{item.time}</span>
                  </div>
                  {item.handover ? (
                    <p className="mt-1 text-[11px] font-medium text-rose-500">Human Handover</p>
                  ) : null}
                  <p className="mt-1 truncate text-sm text-theo-muted">{item.preview}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
        {visible.length === 0 ? (
          <p className="py-8 text-center text-sm text-theo-muted">No conversations in this view.</p>
        ) : null}
      </div>
    </div>
  )
}
