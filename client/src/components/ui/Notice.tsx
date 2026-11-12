export function Notice({ children }: { children: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-theo-muted">
      {children}
    </div>
  )
}
