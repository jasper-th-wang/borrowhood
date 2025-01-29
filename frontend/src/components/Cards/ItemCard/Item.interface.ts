export interface Item {
  id: string
  image: string
  coordinates: {
    lat: string
    lng: string
  }
  ownerId: string
  title: string
  rental_terms: string[]
  tags: string[]
}