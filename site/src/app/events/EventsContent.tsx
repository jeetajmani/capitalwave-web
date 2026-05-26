"use client"

import { motion } from 'framer-motion'

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

function parseDateParts(dateStr: string) {
  const [, mm, dd] = dateStr.split('-')
  return {
    month: MONTHS[parseInt(mm) - 1],
    day: dd,
  }
}

type SanityEvent = {
  _id: string
  title: string
  date: string
  venue: string
  type: string
  description?: string
  ticketUrl?: string
}

export default function EventsContent({ upcoming, past }: { upcoming: SanityEvent[], past: SanityEvent[] }) {
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
        <section className="max-w-4xl mx-auto mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">Upcoming</p>
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
                      {/* Date */}
                      <div className="text-center shrink-0" style={{ minWidth: '3.5rem' }}>
                        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{month}</p>
                        <p className="text-4xl font-black leading-none">{day}</p>
                      </div>

                      {/* Content */}
                      <div className="flex-1" style={{ minWidth: 0 }}>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <p className="font-black tracking-wider uppercase text-base">{event.title}</p>
                          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground border border-neutral-700/60 rounded-full px-3 py-0.5 shrink-0">{event.type}</span>
                        </div>
                        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">{event.venue}</p>
                        {event.description && (
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        )}
                      </div>

                      {/* Tickets */}
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
          <section className="max-w-4xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">Past Events</p>
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
                      <p className="font-bold tracking-wider uppercase text-sm">{event.title}</p>
                      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">{event.venue}</p>
                    </div>
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground border border-neutral-700/40 rounded-full px-3 py-0.5 shrink-0">{event.type}</span>
                  </motion.div>
                )
              })}
            </div>
          </section>
        )}

      </main>
    </div>
  )
}
