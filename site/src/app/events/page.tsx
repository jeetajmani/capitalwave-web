import { client } from '@/sanity/client'
import EventsContent from './EventsContent'

type SanityEvent = {
  _id: string
  title: string
  date: string
  venue: string
  type: string
  description?: string
  ticketUrl?: string
}

const query = `*[_type == "event"] | order(date asc) {
  _id, title, date, venue, type, description, ticketUrl
}`

export default async function EventsPage() {
  const events: SanityEvent[] = await client.fetch(query)
  const today = new Date().toISOString().split('T')[0]
  const upcoming = events.filter(e => e.date >= today)
  const past = events.filter(e => e.date < today).reverse()
  return <EventsContent upcoming={upcoming} past={past} />
}

