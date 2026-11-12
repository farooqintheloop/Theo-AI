import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'bar'
}

export function Button({
  className,
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-12 items-center justify-center px-5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' && 'w-full rounded-full bg-theo text-white hover:bg-theo-dark',
        variant === 'secondary' &&
          'w-full rounded-full border border-theo/20 bg-white text-theo hover:bg-theo-soft',
        variant === 'ghost' && 'text-theo-muted hover:text-theo',
        variant === 'bar' && 'w-full rounded-xl bg-theo text-white hover:bg-theo-dark',
        className,
      )}
      {...props}
    />
  )
}
