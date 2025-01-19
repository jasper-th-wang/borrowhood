export interface Community {
  id: string
  image: string
  memberAmount: string
  communityName: string
  coordinates: {
    lat: number
    lng: number
  }
}