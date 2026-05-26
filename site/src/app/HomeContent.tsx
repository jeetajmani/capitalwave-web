"use client"

import Link from 'next/link';
import Image from 'next/image';
import AnimatedLogo from '@/components/AnimatedLogo';
import { motion } from 'framer-motion';
import GlitchText from '@/components/GlitchText';
import { AnimatedFlashButton } from '@/components/ui/flashbutton';

type Artist = {
  _id: string
  name: string
  genre: string
  role?: string
  photoUrl?: string
}

type SanityEvent = {
  _id: string
  title: string
  date: string
  venue: string
  time?: string
  type: string
  ticketUrl?: string
}

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
function parseDateParts(dateStr: string) {
  const [, mm, dd] = dateStr.split('-')
  return { month: MONTHS[parseInt(mm) - 1], day: dd }
}

const roleStyle: Record<string, React.CSSProperties> = {
  Artist:       { color: '#60a5fa', borderColor: 'rgba(96,165,250,0.4)' },
  Engineer:     { color: '#34d399', borderColor: 'rgba(52,211,153,0.4)' },
  Videographer: { color: '#fbbf24', borderColor: 'rgba(251,191,36,0.4)' },
}

const servicesOverview = [
  { title: "Audio Recording", subtitle: "Capture Every Detail", description: "State-of-the-art rooms, acoustically treated booths, and experienced engineers on every session." },
  { title: "Music Production", subtitle: "Shape Your Sound", description: "Custom beats and full arrangements across all genres, from concept to master." },
  { title: "Mixing & Mastering", subtitle: "Industry-Ready Sound", description: "Streaming-optimised masters with reference-level clarity, depth, and revisions included." },
  { title: "Video Production", subtitle: "Visual Storytelling", description: "Music videos, live sessions, and promo content with cinematic colour grading." },
]

export default function HomeContent({ rosterPreview, upcomingEvents }: { rosterPreview: Artist[], upcomingEvents: SanityEvent[] }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center w-full bg-gradient-to-b from-black to-gray-900 pt-8 pb-10 justify-center gap-6 py-8" style={{ height: 'calc(100dvh - var(--header-height, 0px))' }}>
            <div className="flex flex-col items-center w-full h-[280px] sm:h-[240px] md:h-[280px] lg:h-[340px] xl:h-[380px] 2xl:h-[420px]">
              <AnimatedLogo />
            </div>
            <div className="flex flex-col items-center gap-5 sm:gap-6">
              <div className="flex flex-col items-center gap-1">
                <GlitchText text="CAPITAL WAVE" baseGlitchSpeed={3000} />
                <GlitchText text="ENTERTAINMENT" baseGlitchSpeed={3700} />
                <p className="text-muted-foreground tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs text-center w-full mt-3">
                  Victoria&apos;s Premier Music{' '}<br className="md:hidden" />Studio &amp; Record Label
                </p>
              </div>
            </div>
            <AnimatedFlashButton text="Book Now" size="lg" className="h-14 px-10 text-xl sm:h-12 sm:px-6 sm:text-lg" variant="outline" />
          </div>
        </motion.div>

        {/* Services Overview */}
        <section id="services" className="w-full py-24 px-6 lg:px-20 border-t border-neutral-800">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase">Our Services</h2>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-800/60 border border-neutral-800/60 rounded-2xl overflow-hidden mb-14">
            {servicesOverview.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                className="bg-black px-8 py-10 flex flex-col gap-4 hover:bg-neutral-900/60 transition-colors duration-300"
              >
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{service.subtitle}</p>
                <h3 className="text-xl font-black tracking-wider uppercase">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Link href="/services">
              <AnimatedFlashButton text="View All Services" variant="outline" />
            </Link>
          </motion.div>

        </section>

        {/* Roster Preview */}
        <section id="roster" className="w-full py-24 px-6 lg:px-20 border-t border-neutral-800">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">The Talent</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase">Our Roster</h2>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            {rosterPreview.map((artist, i) => (
              <motion.div
                key={artist._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
                className="flex flex-col gap-3"
              >
                <div className="relative aspect-[3/4] rounded-xl bg-neutral-800/60 border border-neutral-700/40 overflow-hidden">
                  {artist.photoUrl ? (
                    <Image
                      src={artist.photoUrl}
                      alt={artist.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-muted-foreground/30 text-xs tracking-[0.3em] uppercase">Photo</span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-black tracking-wider uppercase text-sm">{artist.name}</p>
                    {artist.role && (
                      <span
                        className="inline-flex items-center uppercase border rounded-full px-3 py-1 shrink-0"
                        style={{ fontSize: '10px', letterSpacing: '0.1em', ...(roleStyle[artist.role] ?? { color: '#a3a3a3', borderColor: 'rgba(163,163,163,0.4)' }) }}
                      >
                        {artist.role}
                      </span>
                    )}
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{artist.genre}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Link href="/roster">
              <AnimatedFlashButton text="View Full Roster" variant="outline" />
            </Link>
          </motion.div>
        </section>

        {/* Events Preview */}
        <section id="events" className="w-full py-24 px-6 lg:px-20 border-t border-neutral-800">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">What&apos;s On</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase">Upcoming Events</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto flex flex-col mb-14">
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground tracking-wider text-center py-8">No upcoming events at this time.</p>
            ) : (
              upcomingEvents.map((event, i) => {
                const { month, day } = parseDateParts(event.date)
                return (
                  <div key={event._id}>
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{
                        x: 8,
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        transition: { duration: 0.2, ease: 'easeOut' },
                      }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
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
                      <div className="text-center shrink-0" style={{ minWidth: '3.5rem' }}>
                        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{month}</p>
                        <p className="text-4xl font-black leading-none">{day}</p>
                        {event.time && (
                          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground/70 mt-1">{event.time}</p>
                        )}
                      </div>
                      <div className="flex-1" style={{ minWidth: 0 }}>
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <p className="font-black tracking-wider uppercase text-base">{event.title}</p>
                          <span className="hidden sm:inline text-xs tracking-[0.2em] uppercase text-muted-foreground border border-neutral-700/60 rounded-full px-3 py-0.5 shrink-0">{event.type}</span>
                        </div>
                        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{event.venue}</p>
                      </div>

                      {/* Quick ticket link */}
                      {event.ticketUrl && (
                        <a
                          href={event.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
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
                    {i < upcomingEvents.length - 1 && (
                      <div className="border-b border-neutral-800" />
                    )}
                  </div>
                )
              })
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Link href="/events">
              <AnimatedFlashButton text="View All Events" variant="outline" />
            </Link>
          </motion.div>
        </section>

        {/* Book CTA */}
        <section className="w-full py-32 px-6 lg:px-20 border-t border-neutral-800 bg-gradient-to-b from-neutral-900 to-black">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Let&apos;s Create</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-widest uppercase leading-tight mb-6">
              Ready To Make<br />Something?
            </h2>
            <p className="text-muted-foreground text-sm tracking-wider mb-10 max-w-md mx-auto">
              Book a session and bring your vision to life at Victoria&apos;s premier music studio.
            </p>
            <Link href="/book">
              <AnimatedFlashButton text="Book a Session" size="lg" variant="outline" />
            </Link>
          </motion.div>
        </section>

      </main>
    </div>
  )
}
