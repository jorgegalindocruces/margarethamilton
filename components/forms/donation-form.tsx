'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function DonationForm() {
  const [formData, setFormData] = useState({
    donationType: 'company_donation' as 'sponsor_school' | 'company_donation',
    company: '',
    contactPerson: '',
    email: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    const formDataObj = new FormData(e.currentTarget)

    try {
      const response = await fetch('https://formspree.io/f/xaqjwzva', {
        method: 'POST',
        body: formDataObj,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setStatus('success')
        setMessage('¡Gracias! Hemos recibido tu solicitud de colaboración y nos pondremos en contacto contigo pronto.')
        setFormData({
          donationType: 'company_donation',
          company: '',
          contactPerson: '',
          email: '',
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Tipo de colaboración *
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="donationType"
              value="sponsor_school"
              checked={formData.donationType === 'sponsor_school'}
              onChange={(e) => setFormData({ ...formData, donationType: e.target.value as any })}
              disabled={status === 'loading' || status === 'success'}
              className="h-4 w-4 text-primary-600"
              required
            />
            <span>Quiero esponsorizar una escuela</span>
          </label>

          <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="donationType"
              value="company_donation"
              checked={formData.donationType === 'company_donation'}
              onChange={(e) => setFormData({ ...formData, donationType: e.target.value as any })}
              disabled={status === 'loading' || status === 'success'}
              className="h-4 w-4 text-primary-600"
              required
            />
            <span>Quiero donar por mi empresa</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
          Empresa *
        </label>
        <Input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          disabled={status === 'loading' || status === 'success'}
          minLength={2}
          required
        />
      </div>

      <div>
        <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
          Persona de contacto *
        </label>
        <Input
          id="contactPerson"
          name="contactPerson"
          type="text"
          value={formData.contactPerson}
          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
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
