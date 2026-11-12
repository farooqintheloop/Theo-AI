import { NavLink, Outlet } from 'react-router-dom'
import {
  Briefcase,
  House,
  MapPin,
  Settings,
  UserRound,
} from 'lucide-react'
import { cn } from '@/lib/cn'

const nav = [
  { to: '/dashboard', label: 'Home', icon: House },
  { to: '/profile', label: 'Profile', icon: UserRound },
  { to: '/train', label: 'Train', icon: MapPin },
  { to: '/work', label: 'Work', icon: Briefcase },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function AppShell() {
  return (
    <div className="min-h-svh bg-[#f4f2f7]">
      <main className="mx-auto max-w-4xl px-4 py-6 pb-28">
        <Outlet />
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-4xl grid-cols-5">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 py-3 text-[11px] font-medium',
                  isActive ? 'text-theo' : 'text-theo-muted',
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
