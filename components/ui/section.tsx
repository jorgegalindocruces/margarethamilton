import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'
import Image from 'next/image'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'gray' | 'primary'
  backgroundImage?: string
  overlayOpacity?: 'light' | 'medium' | 'dark'
}

export function Section({
  className,
  variant = 'default',
  backgroundImage,
  overlayOpacity = 'medium',
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'relative py-16 sm:py-20 lg:py-24',
        {
          'bg-white': variant === 'default' && !backgroundImage,
          'bg-gray-50': variant === 'gray' && !backgroundImage,
          'bg-primary-50': variant === 'primary' && !backgroundImage,
        },
        className
      )}
      {...props}
    >
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority={false}
          />
          <div
            className={cn(
              'absolute inset-0',
              {
                'bg-white/70': overlayOpacity === 'light',
                'bg-white/80': overlayOpacity === 'medium',
                'bg-white/90': overlayOpacity === 'dark',
              }
            )}
          />
        </>
      )}
      <div className={cn({ 'relative z-10': backgroundImage })}>
        {children}
      </div>
    </section>
  )
}
