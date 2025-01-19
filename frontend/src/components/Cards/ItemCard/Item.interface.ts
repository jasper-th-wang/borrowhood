export interface Item {
  id: string
  image: string
  distance: string
  itemName: string
  lender: string
  coordinates: {
    lat: number
    lng: number
  }
}