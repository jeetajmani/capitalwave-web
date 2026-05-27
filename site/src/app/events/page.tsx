import { client } from '@/sanity/client'
import EventsContent from './EventsContent'

export const revalidate = 3600

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

const query = `*[_type == "event"] | order(date asc) {
  _id, title, date, time, venue, type, description, ticketUrl, "posterUrl": poster.asset->url
}`

export default async function EventsPage() {
  const events: SanityEvent[] = await client.fetch(query)
  const today = new Date().toISOString().split('T')[0]
  const upcoming = events.filter(e => e.date >= today)
  const past = events.filter(e => e.date < today).reverse()
  return <EventsContent upcoming={upcoming} past={past} />
}

