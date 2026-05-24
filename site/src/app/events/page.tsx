"use client"

import { motion } from 'framer-motion'

const upcoming = [
  { month: "Jun", day: "14", title: "Summer Sessions Vol. 1", venue: "Capital Wave Studio, Victoria", type: "Showcase", description: "An intimate evening showcasing our latest roster signings." },
  { month: "Jul", day: "04", title: "Independence Night Live", venue: "The Royal Theatre, Victoria", type: "Concert", description: "A full live performance featuring artists from the Capital Wave family." },
  { month: "Jul", day: "19", title: "Artist Showcase #3", venue: "Capital Wave Studio, Victoria", type: "Showcase", description: "Live performances and networking with Victoria's music community." },
  { month: "Aug", day: "02", title: "Beat Battle Vol. 2", venue: "Capital Wave Studio, Victoria", type: "Workshop", description: "Producers compete head-to-head for studio time and a label deal." },
  { month: "Sep", day: "11", title: "Studio Open Day", venue: "Capital Wave Studio, Victoria", type: "Open Day", description: "Tour the facility, meet the engineers, and learn what we offer." },
]

const past = [
  { month: "Apr", day: "20", title: "Spring Showcase 2026", venue: "Capital Wave Studio, Victoria", type: "Showcase" },
  { month: "Mar", day: "08", title: "International Women's Day Live", venue: "Hermann's Jazz Club", type: "Concert" },
  { month: "Feb", day: "14", title: "Valentine's R&B Night", venue: "The Royal Theatre, Victoria", type: "Concert" },
]

export default function EventsPage() {
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
          <div className="flex flex-col">
            {upcoming.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                className={`flex items-start gap-8 py-8 ${i < upcoming.length - 1 ? 'border-b border-neutral-800' : ''}`}
              >
                <div className="text-center min-w-[3.5rem] pt-1">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{event.month}</p>
                  <p className="text-4xl font-black leading-none">{event.day}</p>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <p className="font-black tracking-wider uppercase text-base md:text-lg">{event.title}</p>
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground border border-neutral-700/60 rounded-full px-3 py-0.5">{event.type}</span>
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">{event.venue}</p>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Past */}
        <section className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">Past Events</p>
          <div className="flex flex-col">
            {past.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 + i * 0.07 }}
                className={`flex items-center gap-8 py-5 opacity-50 ${i < past.length - 1 ? 'border-b border-neutral-800' : ''}`}
              >
                <div className="text-center min-w-[3.5rem]">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{event.month}</p>
                  <p className="text-2xl font-black leading-none">{event.day}</p>
                </div>
                <div className="flex-1">
                  <p className="font-bold tracking-wider uppercase text-sm">{event.title}</p>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">{event.venue}</p>
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground border border-neutral-700/40 rounded-full px-3 py-0.5 shrink-0">{event.type}</span>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
