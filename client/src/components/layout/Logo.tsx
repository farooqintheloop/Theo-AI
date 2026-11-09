export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold ${
          light ? 'bg-white text-theo' : 'bg-theo text-white'
        }`}
      >
        T
      </span>
      <span className={`text-lg font-bold tracking-tight ${light ? 'text-white' : 'text-theo-ink'}`}>
        THEO
      </span>
    </div>
  )
}
