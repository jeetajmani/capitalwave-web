import { client } from '@/sanity/client'
import HomeContent from './HomeContent'

const query = `*[_type == "talent"] | order(name asc)[0..3] {
  _id,
  name,
  genre,
  role,
  "photoUrl": photo.asset->url
}`

export default async function Page() {
  const rosterPreview = await client.fetch(query)
  return <HomeContent rosterPreview={rosterPreview} />
}
