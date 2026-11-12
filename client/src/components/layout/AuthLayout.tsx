import { Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function AuthLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const isLogin = pathname !== '/register'

  return (
    <div className="flex min-h-svh flex-col bg-[#f4f2f7]">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-5 py-8">
        <div className="grid grid-cols-2 rounded-full bg-zinc-200/70 p-1">
          <Link
            to="/login"
            className={cn(
              'rounded-full py-3 text-center text-sm font-semibold',
              isLogin ? 'bg-theo text-white shadow-sm' : 'text-theo-muted',
            )}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={cn(
              'rounded-full py-3 text-center text-sm font-semibold',
              !isLogin ? 'bg-theo text-white shadow-sm' : 'text-theo-muted',
            )}
          >
            Sign Up
          </Link>
        </div>
        <div className="mt-14 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-theo-soft text-theo">
            <Sparkles className="h-6 w-6" />
          </span>
          {children}
        </div>
      </div>
    </div>
  )
}
