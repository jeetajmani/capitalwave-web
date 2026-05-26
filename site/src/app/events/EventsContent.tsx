"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

function parseDateParts(dateStr: string) {
  const [, mm, dd] = dateStr.split('-')
  return { month: MONTHS[parseInt(mm) - 1], day: dd }
}

type SanityEvent = {
  _id: string
  title: string
  date: string
  venue: string
  time?: string
  type: string
  description?: string
  ticketUrl?: string
  posterUrl?: string
}

export default function EventsContent({ upcoming, past }: { upcoming: SanityEvent[], past: SanityEvent[] }) {
  const [selectedEvent, setSelectedEvent] = useState<SanityEvent | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedEvent(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedEvent ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedEvent])

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1 px-6 lg:px-20 pt-16 pb-24">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">What&apos;s On</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-widest uppercase">Events</h1>
        </motion.div>

        {/* Upcoming */}
        <section className="mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Upcoming</p>
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground tracking-wider">No upcoming events at this time.</p>
          ) : (
            <div className="flex flex-col">
              {upcoming.map((event, i) => {
                const { month, day } = parseDateParts(event.date)
                return (
                  <div key={event._id}>
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{
                        x: 8,
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        transition: { duration: 0.2, ease: 'easeOut' },
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                      onClick={() => setSelectedEvent(event)}
                      className="flex items-center gap-8 cursor-pointer"
                      style={{
                        paddingTop: '1.75rem',
                        paddingBottom: '1.75rem',
                        paddingLeft: '1rem',
                        paddingRight: '1rem',
                        marginLeft: '-1rem',
                        marginRight: '-1rem',
                        borderRadius: '12px',
                      }}
                    >
                      {/* Date + time */}
                      <div className="text-center shrink-0" style={{ minWidth: '3.5rem' }}>
                        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{month}</p>
                        <p className="text-4xl font-black leading-none">{day}</p>
                        {event.time && (
                          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground/70 mt-1">{event.time}</p>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1" style={{ minWidth: 0 }}>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <p className="font-black tracking-wider uppercase text-base">{event.title}</p>
                          <span className="hidden sm:inline text-xs tracking-[0.2em] uppercase text-muted-foreground border border-neutral-700/60 rounded-full px-3 py-0.5 shrink-0">{event.type}</span>
                        </div>
                        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">{event.venue}</p>
                        {event.description && (
                          <p className="text-sm text-muted-foreground" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{event.description}</p>
                        )}
                      </div>

                      {/* Quick ticket link */}
                      {event.ticketUrl && (
                        <a
                          href={event.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="shrink-0 flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase border rounded-full text-muted-foreground transition-colors whitespace-nowrap"
                          style={{
                            borderColor: 'rgba(115,115,115,0.5)',
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                            paddingTop: '0.5rem',
                            paddingBottom: '0.5rem',
                          }}
                          onMouseEnter={e => {
                            ;(e.currentTarget as HTMLAnchorElement).style.color = '#fff'
                            ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(163,163,163,0.8)'
                          }}
                          onMouseLeave={e => {
                            ;(e.currentTarget as HTMLAnchorElement).style.color = ''
                            ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(115,115,115,0.5)'
                          }}
                        >
                          Get tickets <span style={{ fontSize: '14px', lineHeight: 1 }}>»</span>
                        </a>
                      )}
                    </motion.div>
                    {i < upcoming.length - 1 && (
                      <div className="border-b border-neutral-800" />
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* Past */}
        {past.length > 0 && (
          <section>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Past Events</p>
            <div className="flex flex-col">
              {past.map((event, i) => {
                const { month, day } = parseDateParts(event.date)
                return (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 + i * 0.07 }}
                    className={`flex items-center gap-8 py-5 ${i < past.length - 1 ? 'border-b border-neutral-800' : ''}`}
                  >
                    <div className="text-center shrink-0" style={{ minWidth: '3.5rem' }}>
                      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{month}</p>
                      <p className="text-2xl font-black leading-none">{day}</p>
                    </div>
                    <div className="flex-1" style={{ minWidth: 0 }}>
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <p className="font-bold tracking-wider uppercase text-sm">{event.title}</p>
                        <span className="hidden sm:inline text-xs tracking-[0.2em] uppercase text-muted-foreground border border-neutral-700/40 rounded-full px-3 py-0.5 shrink-0">{event.type}</span>
                      </div>
                      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{event.venue}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>
        )}

      </main>

      {/* Poster Lightbox */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            {/* Backdrop — animates blur amount and bg color (never changes opacity),
                so the GPU compositing layer is never promoted/demoted mid-animation */}
            <motion.div
              key="backdrop"
              initial={{ backdropFilter: 'blur(0px)', backgroundColor: 'rgba(0,0,0,0)' }}
              animate={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.65)' }}
              exit={{ backdropFilter: 'blur(0px)', backgroundColor: 'rgba(0,0,0,0)' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 z-50"
            />

            {/* Card container — separate opacity fade, no backdrop-filter */}
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex justify-center"
              style={{ alignItems: 'flex-start', overflowY: 'auto', paddingTop: '2rem', paddingBottom: '2rem', pointerEvents: 'none' }}
            >

            {/* Flip card — click anywhere to close */}
            <div style={{ perspective: '1200px', margin: 'auto', position: 'relative', zIndex: 1, pointerEvents: 'auto' }} onClick={() => setSelectedEvent(null)}>
              <motion.div
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
                transition={{ type: 'spring', damping: 22, stiffness: 130, delay: 0.08 }}
                className="flex flex-col items-center gap-5"
                style={{ width: 'min(380px, 88vw)' }}
              >
                {/* Poster */}
                <div
                  className="relative w-full overflow-hidden rounded-xl border border-neutral-700/50"
                  style={{ aspectRatio: '2/3', background: '#111' }}
                >
                  {selectedEvent.posterUrl ? (
                    <Image
                      src={selectedEvent.posterUrl}
                      alt={`${selectedEvent.title} poster`}
                      fill
                      className="object-cover"
                      sizes="380px"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-3">
                      <p className="font-black tracking-wider uppercase text-lg">{selectedEvent.title}</p>
                      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{selectedEvent.venue}</p>
                    </div>
                  )}
                </div>

                {/* Flashing ticket button */}
                {selectedEvent.ticketUrl ? (
                  <motion.a
                    href={selectedEvent.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    animate={{ opacity: [1, 0.35, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    onClick={e => e.stopPropagation()}
                    className="w-full text-center font-black tracking-[0.25em] uppercase border border-white rounded-full py-4 text-sm"
                  >
                    Get your tickets now!
                  </motion.a>
                ) : (
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/50">Free admission</p>
                )}

                {/* Full description */}
                {selectedEvent.description && (
                  <p className="w-full text-sm text-muted-foreground text-center" style={{ lineHeight: '1.6' }}>{selectedEvent.description}</p>
                )}

                
              </motion.div>
            </div>
          </motion.div>
        </>
        )}
      </AnimatePresence>
    </div>
  )
}
