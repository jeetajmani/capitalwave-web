import { client } from '@/sanity/client'
import HomeContent from './HomeContent'

export const revalidate = 3600

const rosterQuery = `*[_type == "talent"] | order(name asc)[0..3] {
  _id,
  name,
  genre,
  role,
  "photoUrl": photo.asset->url
}`

const eventsQuery = `*[_type == "event" && date >= $today] | order(date asc)[0..2] {
  _id, title, date, time, venue, type, ticketUrl
}`

export default async function Page() {
  const today = new Date().toISOString().split('T')[0]
  const [rosterPreview, upcomingEvents] = await Promise.all([
    client.fetch(rosterQuery),
    client.fetch(eventsQuery, { today }),
  ])
  return <HomeContent rosterPreview={rosterPreview} upcomingEvents={upcomingEvents} />
}
