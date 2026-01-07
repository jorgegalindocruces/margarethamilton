import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'gray' | 'primary'
}

export function Section({ className, variant = 'default', children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        'py-16 sm:py-20 lg:py-24',
        {
          'bg-white': variant === 'default',
          'bg-gray-50': variant === 'gray',
          'bg-primary-50': variant === 'primary',
        },
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
