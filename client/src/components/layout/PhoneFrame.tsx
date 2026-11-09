import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-[#0c0a14] p-4">
      <div className="flex min-h-[760px] w-full max-w-[390px] flex-col overflow-hidden rounded-[36px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-center pt-3">
          <span className="h-1.5 w-16 rounded-full bg-zinc-200" />
        </div>
        {children}
        <div className="mt-auto flex justify-center gap-4 px-6 pb-6 text-[11px] text-theo-muted">
          <Link to="/privacy" className="hover:text-theo">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-theo">
            Terms
          </Link>
        </div>
      </div>
    </div>
  )
}
