import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        {
          'bg-gray-100 text-gray-800': variant === 'default',
          'bg-primary-100 text-primary-800': variant === 'primary',
          'bg-blue-100 text-blue-800': variant === 'secondary',
        },
        className
      )}
      {...props}
    />
  )
}
