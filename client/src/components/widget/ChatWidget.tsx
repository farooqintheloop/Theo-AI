import { Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

type ChatMessage = {
  role: 'assistant' | 'customer'
  text: string
}

const starter: ChatMessage[] = [
  {
    role: 'assistant',
    text: 'Hi, I am Sophia. Welcome to Grand Plaza. How can I help with your stay?',
  },
]

export function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>(starter)
  const [draft, setDraft] = useState('')

  function send() {
    const text = draft.trim()
    if (!text) return
    setMessages((current) => [
      ...current,
      { role: 'customer', text },
      {
        role: 'assistant',
        text: 'Thanks — I will take that enquiry and pass it to the team. The live AI reply will come from the API next.',
      },
    ])
    setDraft('')
  }

  return (
    <div className="flex h-[520px] flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl">
      <div className="bg-theo px-5 py-4 text-white">
        <p className="text-sm font-semibold">THEO chat</p>
        <p className="text-xs text-white/80">Website widget preview</p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={
              message.role === 'assistant'
                ? 'max-w-[85%] rounded-2xl rounded-tl-sm bg-theo-soft px-3 py-2 text-sm'
                : 'ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-theo px-3 py-2 text-sm text-white'
            }
          >
            {message.text}
          </div>
        ))}
      </div>
      <form
        className="flex gap-2 border-t border-zinc-100 p-3"
        onSubmit={(event) => {
          event.preventDefault()
          send()
        }}
      >
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask about hours, rooms or bookings"
          className="h-11 flex-1 rounded-full border border-zinc-200 px-4 text-sm outline-none focus:border-theo"
        />
        <Button
          type="submit"
          aria-label="Send message"
          className="h-11 w-11 shrink-0 rounded-full p-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
