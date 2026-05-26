"use client"

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type Artist = {
  _id: string
  name: string
  genre: string
  role?: string
  photoUrl?: string
}

const roleStyle: Record<string, React.CSSProperties> = {
  Artist:       { color: '#60a5fa', borderColor: 'rgba(96,165,250,0.4)' },
  Engineer:     { color: '#34d399', borderColor: 'rgba(52,211,153,0.4)' },
  Videographer: { color: '#fbbf24', borderColor: 'rgba(251,191,36,0.4)' },
}

const roleActiveStyle: Record<string, React.CSSProperties> = {
  Artist:       { color: '#fff', backgroundColor: '#60a5fa', borderColor: '#60a5fa' },
  Engineer:     { color: '#fff', backgroundColor: '#34d399', borderColor: '#34d399' },
  Videographer: { color: '#fff', backgroundColor: '#fbbf24', borderColor: '#fbbf24' },
}

const SORT_OPTIONS = [
  { value: 'az',   label: 'A → Z' },
  { value: 'za',   label: 'Z → A' },
]

const ALL_ROLES = ['Artist', 'Engineer', 'Videographer']

export default function RosterContent({ artists }: { artists: Artist[] }) {
  const [search, setSearch]           = useState('')
  const [activeRoles, setActiveRoles] = useState<string[]>([])
  const [activeGenres, setActiveGenres] = useState<string[]>([])
  const [sort, setSort]               = useState('az')

  const genres = useMemo(() =>
    [...new Set(artists.map(a => a.genre).filter(Boolean))].sort(),
  [artists])

  const toggleRole = (role: string) =>
    setActiveRoles(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role])

  const toggleGenre = (genre: string) =>
    setActiveGenres(prev => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre])

  const filtered = useMemo(() => {
    let result = [...artists]
    if (search.trim())
      result = result.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))
    if (activeRoles.length)
      result = result.filter(a => a.role && activeRoles.includes(a.role))
    if (activeGenres.length)
      result = result.filter(a => activeGenres.includes(a.genre))
    result.sort((a, b) =>
      sort === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    )
    return result
  }, [artists, search, activeRoles, activeGenres, sort])

  const hasFilters = search.trim().length > 0 || activeRoles.length > 0 || activeGenres.length > 0

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1 px-6 lg:px-20 pt-16 pb-24">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-4"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">The Talent</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-widest uppercase">Our Roster</h1>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          className="mb-10 flex flex-col gap-5"
        >
          {/* Search + Sort row */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-neutral-900/60 border border-neutral-700/60 rounded-lg px-3 py-2 transition-colors focus-within:border-neutral-500" style={{ width: '100%', maxWidth: '20rem' }}>
              <svg className="text-muted-foreground/50 size-4 shrink-0 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm tracking-wide text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                style={{ minWidth: 0 }}
              />
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-neutral-900/60 border border-neutral-700/60 rounded-lg px-3 py-2 text-sm tracking-wide text-muted-foreground focus:outline-none focus:border-neutral-500 transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Role toggles */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60" style={{ minWidth: '3.5rem' }}>Role</span>
            {ALL_ROLES.map(role => {
              const active = activeRoles.includes(role)
              return (
                <button
                  key={role}
                  onClick={() => toggleRole(role)}
                  className="inline-flex items-center uppercase border rounded-full px-3 py-1 transition-all duration-200 cursor-pointer"
                  style={{
                    fontSize: '10px', letterSpacing: '0.1em',
                    ...(active
                      ? (roleActiveStyle[role] ?? { color: '#fff', backgroundColor: '#a3a3a3', borderColor: '#a3a3a3' })
                      : (roleStyle[role]       ?? { color: '#a3a3a3', borderColor: 'rgba(163,163,163,0.4)' }))
                  }}
                >
                  {role}
                </button>
              )
            })}
          </div>

          {/* Genre toggles */}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60" style={{ minWidth: '3.5rem' }}>Genre</span>
              {genres.map(genre => {
                const active = activeGenres.includes(genre)
                return (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className="inline-flex items-center uppercase border rounded-full px-3 py-1 transition-all duration-200 cursor-pointer"
                    style={{
                      fontSize: '10px', letterSpacing: '0.1em',
                      color:       active ? '#fff'                       : '#a3a3a3',
                      borderColor: active ? 'rgba(255,255,255,0.8)'      : 'rgba(163,163,163,0.4)',
                      backgroundColor: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                    }}
                  >
                    {genre}
                  </button>
                )
              })}
            </div>
          )}

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={() => { setSearch(''); setActiveRoles([]); setActiveGenres([]) }}
              className="self-start text-xs tracking-[0.2em] uppercase text-foreground/60 hover:text-muted-foreground transition-colors cursor-pointer"
            >
              ✕ Clear filters
            </button>
          )}
        </motion.div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/50">
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((artist, i) => (
              <motion.div
                key={artist._id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut', delay: i * 0.04 }}
                className="flex flex-col gap-3 group cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-xl bg-neutral-800/60 border border-neutral-700/40 overflow-hidden group-hover:border-neutral-600/60 transition-colors duration-300">
                  {artist.photoUrl ? (
                    <Image
                      src={artist.photoUrl}
                      alt={artist.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading={i === 0 ? 'eager' : 'lazy'}
                      priority={i === 0}
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
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="py-24 flex flex-col items-center gap-3 text-center">
            <p className="text-2xl font-black tracking-widest uppercase">No results</p>
            <p className="text-sm text-muted-foreground tracking-wider">Try adjusting your filters</p>
          </div>
        )}

      </main>
    </div>
  )
}
