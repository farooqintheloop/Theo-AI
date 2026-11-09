import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Logo } from '@/components/layout/Logo'

export function DocumentLayout({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="min-h-svh bg-[#f6f4fb]">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link to="/">
            <Logo />
          </Link>
          <Link to="/login" className="text-sm font-medium text-theo">
            Log in
          </Link>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="prose-theo mt-6 space-y-4 text-sm leading-7 text-theo-muted">
          {children}
        </div>
      </article>
    </div>
  )
}
