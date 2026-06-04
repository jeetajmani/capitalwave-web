import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import RosterContent from './RosterContent'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Roster',
  description: 'Meet the artists, engineers, and videographers shaping the sound at Capital Wave Studio — Victoria\'s premier music studio and record label.',
}

const query = `*[_type == "talent"] | order(name asc) {
  _id,
  name,
  genre,
  role,
  bio,
  instagram,
  spotify,
  "photoUrl": photo.asset->url
}`

export default async function RosterPage() {
  const artists = await client.fetch(query)
  return <RosterContent artists={artists} />
}
