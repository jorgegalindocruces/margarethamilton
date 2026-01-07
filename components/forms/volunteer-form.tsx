'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    occupation: '',
    address: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    const formDataObj = new FormData(e.currentTarget)

    try {
      const response = await fetch('https://formspree.io/f/xanygjow', {
        method: 'POST',
        body: formDataObj,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setStatus('success')
        setMessage('¡Gracias! Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          occupation: '',
          address: '',
          message: '',
        })
      } else {
        throw new Error('Error al enviar el formulario')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Formspree honeypot field */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={status === 'loading' || status === 'success'}
            minLength={2}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={status === 'loading' || status === 'success'}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={status === 'loading' || status === 'success'}
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de nacimiento
          </label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            disabled={status === 'loading' || status === 'success'}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
            Profesión
          </label>
          <Input
            id="occupation"
            name="occupation"
            type="text"
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            disabled={status === 'loading' || status === 'success'}
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Dirección
          </label>
          <Input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            disabled={status === 'loading' || status === 'success'}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Cuéntanos por qué quieres ser voluntario
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          disabled={status === 'loading' || status === 'success'}
          rows={5}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === 'loading' || status === 'success'}
        className="w-full sm:w-auto"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar solicitud'}
      </Button>

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
