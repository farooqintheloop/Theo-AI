import { Search, Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HotelModal } from '@/components/marketplace/HotelModal'
import { Logo } from '@/components/layout/Logo'
import { hotels, type Hotel } from '@/data/hotels'

export function MarketplacePage() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Hotel | null>(null)

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return hotels
    return hotels.filter((hotel) =>
      `${hotel.name} ${hotel.city} ${hotel.country}`.toLowerCase().includes(term),
    )
  }, [query])

  return (
    <div className="min-h-svh bg-[#f6f4fb]">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/">
            <Logo />
          </Link>
          <label className="relative hidden min-w-0 flex-1 max-w-md sm:block">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-theo-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search hotels or cities"
              className="h-11 w-full rounded-full border border-zinc-200 bg-zinc-50 pr-4 pl-10 text-sm outline-none focus:border-theo"
            />
          </label>
          <Link to="/owner" className="text-sm font-medium text-theo">
            I am an owner
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theo">
          Customer marketplace
        </p>
        <h1 className="mt-2 text-3xl font-bold">Find a hotel</h1>
        <p className="mt-2 text-sm text-theo-muted">
          {hotels.length} properties. Open one to see details and chat with its receptionist.
        </p>
        <label className="relative mt-5 block sm:hidden">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-theo-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search hotels or cities"
            className="h-11 w-full rounded-full border border-zinc-200 bg-white pr-4 pl-10 text-sm outline-none focus:border-theo"
          />
        </label>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((hotel) => (
            <button
              key={hotel.id}
              type="button"
              onClick={() => setSelected(hotel)}
              className="overflow-hidden rounded-3xl bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <img src={hotel.image} alt="" className="h-44 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-semibold">{hotel.name}</h2>
                    <p className="text-sm text-theo-muted">
                      {hotel.city}, {hotel.country}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {hotel.rating}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-theo">
                  From {hotel.currency} {hotel.priceFrom}
                  <span className="font-normal text-theo-muted"> / night</span>
                </p>
              </div>
            </button>
          ))}
        </div>
        {visible.length === 0 ? (
          <p className="mt-10 text-center text-sm text-theo-muted">No hotels match that search.</p>
        ) : null}
      </main>

      {selected ? <HotelModal hotel={selected} onClose={() => setSelected(null)} /> : null}
    </div>
  )
}
