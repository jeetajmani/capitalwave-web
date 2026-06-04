"use client"

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type Artist = {
  _id: string
  name: string
  genre: string
  role?: string
  bio?: string
  instagram?: string
  spotify?: string
  photoUrl?: string
}

const roleStyle: Record<string, React.CSSProperties> = {
  Artist:       { color: '#60a5fa', borderColor: 'rgba(96,165,250,0.4)' },
  Engineer:     { color: '#34d399', borderColor: 'rgba(52,211,153,0.4)' },
  Videographer: { color: '#fbbf24', borderColor: 'rgba(251,191,36,0.4)' },
  Management:   { color: '#fb923c', borderColor: 'rgba(251,146,60,0.4)' },
}

const roleActiveStyle: Record<string, React.CSSProperties> = {
  Artist:       { color: '#fff', backgroundColor: '#60a5fa', borderColor: '#60a5fa' },
  Engineer:     { color: '#fff', backgroundColor: '#34d399', borderColor: '#34d399' },
  Videographer: { color: '#fff', backgroundColor: '#fbbf24', borderColor: '#fbbf24' },
  Management:   { color: '#fff', backgroundColor: '#fb923c', borderColor: '#fb923c' },
}

const SORT_OPTIONS = [
  { value: 'az',   label: 'A → Z' },
  { value: 'za',   label: 'Z → A' },
]

const ALL_ROLES = ['Artist', 'Engineer', 'Videographer', 'Management']

export default function RosterContent({ artists }: { artists: Artist[] }) {
  const [search, setSearch]           = useState('')
  const [activeRoles, setActiveRoles] = useState<string[]>([])
  const [activeGenres, setActiveGenres] = useState<string[]>([])
  const [sort, setSort]               = useState('az')
  const [flippedId, setFlippedId]     = useState<string | null>(null)

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
      <style>{`
        .artist-info {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas: "name" "genre" "pill";
          row-gap: 4px;
        }
        .artist-info > .artist-name { grid-area: name; }
        .artist-info > .artist-genre { grid-area: genre; }
        .artist-info > .artist-pill {
          grid-area: pill;
          justify-self: start;
          margin-top: 4px;
        }
        @media (min-width: 1024px) {
          .artist-info {
            grid-template-columns: 1fr auto;
            column-gap: 12px;
            grid-template-areas: "name pill" "genre genre";
          }
          .artist-info > .artist-pill {
            justify-self: end;
            margin-top: 0;
            align-self: center;
          }
        }
      `}</style>
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
                className="flex flex-col gap-3 group"
              >
                <div
                  className="relative aspect-[3/4] cursor-pointer"
                  style={{ perspective: '1200px' }}
                  onClick={() => setFlippedId(prev => prev === artist._id ? null : artist._id)}
                >
                  <motion.div
                    animate={{ rotateY: flippedId === artist._id ? 180 : 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 130 }}
                    style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}
                  >
                    {/* Front — photo */}
                    <div
                      className="absolute inset-0 rounded-xl bg-neutral-800/60 border border-neutral-700/40 overflow-hidden group-hover:border-neutral-600/60 transition-colors duration-300"
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                      {artist.photoUrl ? (
                        <Image
                          src={artist.photoUrl}
                          alt={artist.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          priority={i < 4}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-muted-foreground/30 text-xs tracking-[0.3em] uppercase">Photo</span>
                        </div>
                      )}
                    </div>

                    {/* Back — bio + socials */}
                    <div
                      className="absolute inset-0 rounded-xl bg-neutral-900 border border-neutral-700/60 overflow-hidden flex flex-col"
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', padding: 'clamp(16px, 8%, 36px)' }}
                    >
                      <p className="font-black tracking-wider uppercase text-sm mb-2 shrink-0">{artist.name}</p>
                      <p className="text-xs text-muted-foreground flex-1 overflow-y-auto" style={{ lineHeight: 1.6 }}>
                        {artist.bio || 'No bio yet.'}
                      </p>
                      {(artist.instagram || artist.spotify) && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 16, marginTop: 12, flexShrink: 0 }}>
                          {artist.instagram && (
                            <a
                              href={artist.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              aria-label={`${artist.name} on Instagram`}
                              style={{ display: 'inline-flex', color: '#a3a3a3', transition: 'color 0.2s' }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                              onMouseLeave={e => (e.currentTarget.style.color = '#a3a3a3')}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                              </svg>
                            </a>
                          )}
                          {artist.spotify && (
                            <a
                              href={artist.spotify}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              aria-label={`${artist.name} on Spotify`}
                              style={{ display: 'inline-flex', color: '#a3a3a3', transition: 'color 0.2s' }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                              onMouseLeave={e => (e.currentTarget.style.color = '#a3a3a3')}
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.96-.601-.122-.42.18-.84.6-.96 4.561-1.021 8.52-.6 11.64 1.32.42.18.479.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
                <div className="artist-info">
                  <p className="artist-name font-black tracking-wider uppercase text-sm">{artist.name}</p>
                  <p className="artist-genre text-xs tracking-[0.2em] uppercase text-muted-foreground">{artist.genre}</p>
                  {artist.role && (
                    <span
                      className="artist-pill"
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.1em',
                        padding: '2px 8px',
                        border: '1px solid',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                        width: 'fit-content',
                        display: 'inline-block',
                        ...(roleStyle[artist.role] ?? { color: '#a3a3a3', borderColor: 'rgba(163,163,163,0.4)' })
                      }}
                    >
                      {artist.role}
                    </span>
                  )}
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
