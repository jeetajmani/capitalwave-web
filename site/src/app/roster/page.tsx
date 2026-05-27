import { client } from '@/sanity/client'
import RosterContent from './RosterContent'

export const revalidate = 3600

const query = `*[_type == "talent"] | order(name asc) {
  _id,
  name,
  genre,
  role,
  "photoUrl": photo.asset->url
}`

export default async function RosterPage() {
  const artists = await client.fetch(query)
  return <RosterContent artists={artists} />
}
