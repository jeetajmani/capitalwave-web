"use client"

import { motion } from 'framer-motion'

const artists = [
  { name: "Artist Name", genre: "R&B / Soul" },
  { name: "Artist Name", genre: "Hip-Hop" },
  { name: "Artist Name", genre: "Pop" },
  { name: "Artist Name", genre: "Electronic" },
  { name: "Artist Name", genre: "Alternative" },
  { name: "Artist Name", genre: "Afrobeats" },
  { name: "Artist Name", genre: "Singer-Songwriter" },
  { name: "Artist Name", genre: "Rap" },
]

export default function RosterPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1 px-6 lg:px-20 pt-16 pb-24">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">The Talent</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-widest uppercase">Our Roster</h1>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {artists.map((artist, i) => (
            <motion.div
              key={`${artist.name}-${i}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.07 }}
              className="flex flex-col gap-3 group cursor-pointer"
            >
              <div className="aspect-[3/4] rounded-xl bg-neutral-800/60 border border-neutral-700/40 flex items-center justify-center overflow-hidden group-hover:border-neutral-600/60 transition-colors duration-300">
                <span className="text-muted-foreground/30 text-xs tracking-[0.3em] uppercase">Photo</span>
              </div>
              <div>
                <p className="font-black tracking-wider uppercase text-sm">{artist.name}</p>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{artist.genre}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </main>
    </div>
  )
}
