import { sanityClient } from '$lib/server/sanity/client'

const QUERY = `*[_type == "announcement"] | order(_createdAt desc) {
  "id": _id,
  "createdAt": _createdAt,
  "updatedAt": _updatedAt,
  title,
  category,
  body
}`

export async function listAnnouncements(): Promise<Announcement[]> {
	return sanityClient.fetch<Announcement[]>(QUERY)
}
