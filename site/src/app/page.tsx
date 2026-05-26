"use client"

import Link from 'next/link';
import AnimatedLogo from '@/components/AnimatedLogo';
import { motion } from 'framer-motion';
import GlitchText from '@/components/GlitchText';
import { AnimatedFlashButton } from '@/components/ui/flashbutton';

const rosterPreview = [
  { name: "Artist Name", genre: "R&B / Soul" },
  { name: "Artist Name", genre: "Hip-Hop" },
  { name: "Artist Name", genre: "Pop" },
  { name: "Artist Name", genre: "Electronic" },
]

const eventsPreview = [
  { month: "Jun", day: "14", title: "Summer Sessions Vol. 1", venue: "Capital Wave Studio, Victoria", type: "Showcase" },
  { month: "Jul", day: "04", title: "Independence Night Live", venue: "The Royal Theatre, Victoria", type: "Concert" },
  { month: "Jul", day: "19", title: "Artist Showcase #3", venue: "Capital Wave Studio, Victoria", type: "Showcase" },
]

const servicesOverview = [
  { title: "Audio Recording", subtitle: "Capture Every Detail", description: "State-of-the-art rooms, acoustically treated booths, and experienced engineers on every session." },
  { title: "Music Production", subtitle: "Shape Your Sound", description: "Custom beats and full arrangements across all genres, from concept to master." },
  { title: "Mixing & Mastering", subtitle: "Industry-Ready Sound", description: "Streaming-optimised masters with reference-level clarity, depth, and revisions included." },
  { title: "Video Production", subtitle: "Visual Storytelling", description: "Music videos, live sessions, and promo content with cinematic colour grading." },
]

export default function Page() {
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
                key={`${artist.name}-${i}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
                className="flex flex-col gap-3"
              >
                <div className="aspect-[3/4] rounded-xl bg-neutral-800/60 border border-neutral-700/40 flex items-center justify-center">
                  <span className="text-muted-foreground/30 text-xs tracking-[0.3em] uppercase">Photo</span>
                </div>
                <div>
                  <p className="font-black tracking-wider uppercase text-sm">{artist.name}</p>
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
            {eventsPreview.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
                className={`flex items-center gap-6 py-6 ${i < eventsPreview.length - 1 ? 'border-b border-neutral-800' : ''}`}
              >
                <div className="text-center min-w-[3.5rem]">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{event.month}</p>
                  <p className="text-3xl font-black leading-none">{event.day}</p>
                </div>
                <div className="flex-1">
                  <p className="font-black tracking-wider uppercase text-sm md:text-base">{event.title}</p>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">{event.venue}</p>
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground border border-neutral-700/60 rounded-full px-3 py-1 shrink-0">{event.type}</span>
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