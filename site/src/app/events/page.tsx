import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import EventsContent from './EventsContent'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming shows, live sessions, and events from Capital Wave Studio artists in Victoria, BC.',
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
  poster?: { asset?: { _ref: string } }
  posterLqip?: string
}

const query = `*[_type == "event"] | order(date asc) {
  _id, title, date, time, venue, type, description, ticketUrl,
  poster,
  "posterLqip": poster.asset->metadata.lqip
}`

export default async function EventsPage() {
  const events: SanityEvent[] = await client.fetch(query)
  const today = new Date().toISOString().split('T')[0]
  const upcoming = events.filter(e => e.date >= today)
  const past = events.filter(e => e.date < today).reverse()
  return <EventsContent upcoming={upcoming} past={past} />
}

