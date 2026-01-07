'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function NewsletterForm({ sourcePath }: { sourcePath?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch('https://formspree.io/f/xvgonrqy', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setStatus('success')
        setMessage('¡Gracias! Te has suscrito correctamente.')
        setEmail('')
      } else {
        throw new Error('Error al enviar el formulario')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Formspree honeypot field */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Hidden fields */}
      {sourcePath && <input type="hidden" name="sourcePath" value={sourcePath} />}

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          name="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading' || status === 'success'}
          required
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          size="md"
        >
          {status === 'loading' ? 'Enviando...' : 'Suscribirme'}
        </Button>
      </div>

      {message && (
        <p
          className={`text-sm ${
            status === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
