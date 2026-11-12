import { Bell, CheckCircle2, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

const staff = [
  { name: 'Sophie', role: 'Hotel Receptionist', status: 'Online' },
  { name: 'James', role: 'Restaurant Host', status: 'In Call' },
  { name: 'Alex', role: 'General Admin', status: 'Offline' },
]

const activity = [
  { title: 'Inquiry about Room 302', meta: 'Sophie · 2 mins ago' },
  { title: 'Dinner Reservation (4pax)', meta: 'James · 18 mins ago' },
]

function statusClass(status: string) {
  if (status === 'Online') return 'text-emerald-600'
  if (status === 'In Call') return 'text-amber-600'
  return 'text-theo-muted'
}

export function DashboardPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Theo</h1>
          <p className="mt-1 text-sm text-theo-muted">Monday, 24 May</p>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-theo-ink shadow-sm"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <Phone className="h-4 w-4 text-theo-muted" />
          <p className="mt-6 text-3xl font-bold">1,284</p>
          <p className="text-sm text-theo-muted">Total Calls</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <CheckCircle2 className="h-4 w-4 text-theo-muted" />
          <p className="mt-6 text-3xl font-bold">856</p>
          <p className="text-sm text-theo-muted">Tasks Done</p>
        </div>
      </div>

      <Link to="/employee">
        <Button variant="bar">Manage AI Staff</Button>
      </Link>

      <section className="rounded-2xl bg-white p-2 shadow-sm">
        <div className="flex items-center justify-between px-3 py-2">
          <h2 className="text-sm font-semibold">Active AI Employees</h2>
          <Link to="/employee" className="text-xs font-semibold text-theo">
            + Create New
          </Link>
        </div>
        <ul>
          {staff.map((person) => (
            <li
              key={person.name}
              className="flex items-center gap-3 border-t border-zinc-100 px-3 py-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-theo-soft text-xs font-bold text-theo">
                AI
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{person.name}</p>
                <p className="text-xs text-theo-muted">{person.role}</p>
              </div>
              <span className={`text-xs font-medium ${statusClass(person.status)}`}>
                {person.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="overflow-hidden rounded-2xl bg-theo p-5 text-white shadow-sm">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/70">
          Current Plan
        </p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-xl font-bold">Business Pro</p>
          <button
            type="button"
            className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold"
          >
            Upgrade
          </button>
        </div>
        <p className="mt-2 text-sm text-white/80">85% of monthly credits used</p>
      </section>

      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold">Recent Activity</h2>
        <ul className="mt-3 space-y-3">
          {activity.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-theo-soft text-theo">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-theo-muted">{item.meta}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
