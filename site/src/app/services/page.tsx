"use client"

import { motion } from 'framer-motion'

const services = [
  {
    title: "Professional Audio Recording",
    subtitle: "Capture Every Detail",
    bullets: [
      "State-of-the-art recording equipment",
      "Acoustically treated live rooms & isolation booths",
      "Experienced audio engineers on every session",
      "Multi-track recording & session management",
    ],
  },
  {
    title: "Music Production",
    subtitle: "Shape Your Sound",
    bullets: [
      "Custom beat creation across all genres",
      "Full arrangement, composition & orchestration",
      "Collaborative production from concept to master",
      "Access to an extensive sample & plugin library",
    ],
  },
  {
    title: "Mixing & Mastering",
    subtitle: "Industry-Ready Sound",
    bullets: [
      "Detailed stem mixing with precision EQ & dynamics",
      "Streaming-optimised masters for all major platforms",
      "Reference-level clarity and depth",
      "Revisions included until you're satisfied",
    ],
  },
  {
    title: "Video Production & Editing",
    subtitle: "Visual Storytelling",
    bullets: [
      "Music videos, live sessions & promotional content",
      "Professional cameras, lighting & direction",
      "Colour grading & cinematic post-production",
      "Social media asset creation & formatting",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1 px-6 lg:px-20 pt-16 pb-24">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">What We Offer</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-widest uppercase">Our Services</h1>
        </motion.div>

        <div className="max-w-6xl mx-auto flex flex-col">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60 }}
              {...(i === 0
                ? { animate: { opacity: 1, y: 0 } }
                : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 } }
              )}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex flex-col"
            >
              {i > 0 && <hr className="border-0 border-t border-dashed border-neutral-700/40" />}
              <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 lg:gap-16 ${i === 0 ? 'pt-4 pb-20 lg:pb-28' : 'py-20 lg:py-28'}`}>
                <div className="w-full md:w-1/2 rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-800/60 border border-neutral-700/40 flex items-center justify-center shrink-0">
                  <span className="text-muted-foreground/30 text-xs tracking-[0.3em] uppercase">Photo</span>
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-5">
                  <div>
                    <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">{service.subtitle}</p>
                    <h2 className="text-2xl md:text-3xl font-black tracking-wider uppercase leading-tight">{service.title}</h2>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {service.bullets.map(bullet => (
                      <li key={bullet} className="flex items-start gap-3 text-muted-foreground text-sm">
                        <span className="text-foreground mt-0.5 shrink-0">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </main>
    </div>
  )
}
