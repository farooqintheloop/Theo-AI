import { cn } from '@/lib/cn'
import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export function Input({ label, error, id, className, ...props }: InputProps) {
  const inputId = id ?? props.name

  return (
    <label className="block text-left" htmlFor={inputId}>
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-theo-ink">
          {label}
        </span>
      ) : null}
      <input
        id={inputId}
        className={cn(
          'h-12 w-full rounded-xl border-0 bg-[#efeef3] px-4 text-sm outline-none transition placeholder:text-zinc-400 focus:ring-4 focus:ring-theo/15',
          error && 'ring-2 ring-red-400 focus:ring-red-100',
          className,
        )}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-red-500">{error}</span> : null}
    </label>
  )
}
