"use client"

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { motion } from 'framer-motion'
import { AnimatedFlashButton } from '@/components/ui/flashbutton'

const serviceOptions = [
  "Professional Audio Recording",
  "Music Production",
  "Mixing & Mastering",
  "Video Production & Editing",
  "Other",
]

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

declare global {
  interface Window {
    turnstile?: {
      render: (selector: string | HTMLElement, opts: { sitekey: string; callback: (token: string) => void; theme?: string }) => string
      reset: (widgetId?: string) => void
    }
  }
}

export default function BookPage() {
  const [form, setForm] = useState({ name: '', email: '', service: '', date: '', message: '', website: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current || widgetIdRef.current) return
    const tryRender = () => {
      if (window.turnstile && turnstileRef.current) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'dark',
          callback: (token: string) => setTurnstileToken(token),
        })
      } else {
        setTimeout(tryRender, 200)
      }
    }
    tryRender()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError('Please complete the verification challenge.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to send.')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
        setTurnstileToken('')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {TURNSTILE_SITE_KEY && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      )}
      <main className="flex-1 px-6 lg:px-20 pt-16 pb-24">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Let&apos;s Create</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-widest uppercase">Book a Session</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="max-w-2xl"
        >
          {submitted ? (
            <div className="py-16">
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Received</p>
              <h2 className="text-3xl font-black tracking-widest uppercase mb-4">We&apos;ll Be In Touch</h2>
              <p className="text-muted-foreground text-sm tracking-wide">
                Thanks for reaching out. A member of our team will contact you within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="bg-transparent border-b border-neutral-700 focus:border-white outline-none py-3 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="bg-transparent border-b border-neutral-700 focus:border-white outline-none py-3 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Service</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="bg-black border-b border-neutral-700 focus:border-white outline-none py-3 text-sm text-foreground transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a service</option>
                  {serviceOptions.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Preferred Date</label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="bg-transparent border-b border-neutral-700 focus:border-white outline-none py-3 text-sm text-foreground transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="bg-transparent border-b border-neutral-700 focus:border-white outline-none py-3 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors resize-none"
                />
              </div>
              {/* Honeypot — hidden from real users, bots fill it */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
                <label>
                  Leave this field empty
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={handleChange}
                  />
                </label>
              </div>
              {TURNSTILE_SITE_KEY && (
                <div ref={turnstileRef} />
              )}
              <div className="pt-2">
                <AnimatedFlashButton text={loading ? 'Sending...' : 'Send Request'} variant="outline" size="lg" />
                {error && <p className="text-sm text-red-400 mt-4 tracking-wide">{error}</p>}
              </div>
            </form>
          )}
        </motion.div>

      </main>
    </div>
  )
}
