import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
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
        'inline-flex h-12 w-full items-center justify-center rounded-full px-5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' && 'bg-theo text-white hover:bg-theo-dark',
        variant === 'secondary' &&
          'border border-theo/20 bg-white text-theo hover:bg-theo-soft',
        variant === 'ghost' && 'text-theo-muted hover:text-theo',
        className,
      )}
      {...props}
    />
  )
}
