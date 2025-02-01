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

export interface Community {
    id: string
    image_url: string
    coordinates: {
        lat: string
        lng: string
    }
    members: number[]
    name: string
    tags: string[]
}