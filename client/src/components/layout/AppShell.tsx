import { NavLink, Outlet } from 'react-router-dom'
import {
  BookOpen,
  LayoutDashboard,
  UserRound,
  WandSparkles,
} from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/cn'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/employee', label: 'AI Employee', icon: UserRound },
  { to: '/knowledge', label: 'Knowledge', icon: BookOpen },
  { to: '/skills', label: 'Skills', icon: WandSparkles },
]

export function AppShell() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-svh bg-[#f6f4fb]">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-sm font-medium',
                    isActive
                      ? 'bg-theo-soft text-theo'
                      : 'text-theo-muted hover:bg-zinc-100',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-theo-muted sm:block">
              {user?.email}
            </span>
            <button
              type="button"
              onClick={logout}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-theo hover:bg-theo-soft"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-24 md:pb-8">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-zinc-200 bg-white md:hidden">
        <div className="grid grid-cols-4">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 py-3 text-[11px]',
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
