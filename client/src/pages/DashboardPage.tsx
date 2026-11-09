import { Link } from 'react-router-dom'
import { MessageSquare, Settings, UserRound, Users } from 'lucide-react'
import { ChatWidget } from '@/components/widget/ChatWidget'

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theo">
          Client dashboard
        </p>
        <h1 className="mt-1 text-2xl font-bold">Grand Plaza overview</h1>
        <p className="mt-1 text-sm text-theo-muted">
          Conversation count, captured enquiries, and your embeddable chat widget.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 text-theo">
            <MessageSquare className="h-5 w-5" />
            <p className="text-sm font-medium">Conversations</p>
          </div>
          <p className="mt-4 text-3xl font-bold">0</p>
          <p className="text-sm text-theo-muted">Will load from /analytics/summary</p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 text-theo">
            <Users className="h-5 w-5" />
            <p className="text-sm font-medium">Enquiries captured</p>
          </div>
          <p className="mt-4 text-3xl font-bold">0</p>
          <p className="text-sm text-theo-muted">Booking requests and messages</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-3xl bg-white p-5 shadow-sm hover:bg-theo-soft/60"
        >
          <UserRound className="h-5 w-5 text-theo" />
          <div>
            <p className="font-semibold">My profile</p>
            <p className="text-sm text-theo-muted">Owner email and password</p>
          </div>
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-3 rounded-3xl bg-white p-5 shadow-sm hover:bg-theo-soft/60"
        >
          <Settings className="h-5 w-5 text-theo" />
          <div>
            <p className="font-semibold">Business settings</p>
            <p className="text-sm text-theo-muted">Hours, contact and plan</p>
          </div>
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Embed on your website</h2>
          <p className="mt-1 text-sm text-theo-muted">
            Copy this script once the public key is issued by the API.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-[#111018] p-4 text-xs text-white">
            {`<script src="https://app.theo.ai/widget.js" data-key="YOUR_PUBLIC_KEY"></script>`}
          </pre>
        </div>
        <ChatWidget />
      </div>
    </div>
  )
}
