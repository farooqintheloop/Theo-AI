import { MapPin, Phone, Star, X } from 'lucide-react'
import { useEffect } from 'react'
import type { Hotel } from '@/data/hotels'
import { ChatWidget } from '@/components/widget/ChatWidget'

type HotelModalProps = {
  hotel: Hotel
  onClose: () => void
}

export function HotelModal({ hotel, onClose }: HotelModalProps) {
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 md:items-center md:p-6">
      <button
        type="button"
        aria-label="Close hotel details"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="hotel-title"
        className="relative z-10 flex max-h-[96svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl md:rounded-3xl"
      >
        <div className="relative h-52 shrink-0 md:h-64">
          <img src={hotel.image} alt="" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-theo-ink shadow"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theo">
              {hotel.city}, {hotel.country}
            </p>
            <h2 id="hotel-title" className="text-3xl font-bold">
              {hotel.name}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1 font-semibold text-theo-ink">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {hotel.rating} · {hotel.reviews.toLocaleString()} reviews
              </span>
              <span className="text-theo-muted">
                From {hotel.currency} {hotel.priceFrom} / night
              </span>
            </div>
            <p className="text-sm leading-6 text-theo-muted">{hotel.description}</p>
            <p className="flex items-start gap-2 text-sm text-theo-ink">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-theo" />
              {hotel.address}
            </p>
            <p className="flex items-center gap-2 text-sm text-theo-ink">
              <Phone className="h-4 w-4 text-theo" />
              {hotel.phone}
            </p>
            <p className="text-sm text-theo-muted">{hotel.hours}</p>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-theo-soft px-3 py-1 text-xs font-medium text-theo"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="text-xs text-theo-muted">
              THEO does not confirm bookings. {hotel.receptionist} will take your
              enquiry and the hotel will follow up.
            </p>
          </div>
          <div className="border-t border-zinc-100 p-4 lg:border-t-0 lg:border-l">
            <ChatWidget
              employeeName={hotel.receptionist}
              hotelName={hotel.name}
              greeting={hotel.greeting}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
