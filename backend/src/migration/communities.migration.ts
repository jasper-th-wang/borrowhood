import { db } from '../firebase';
import 'dotenv/config';
const communities = [
  {
    id: "01",
    image_url: "https://example.com/images/guitar-club.jpg",
    coordinates: {
      lat: "49.2827",
      lng: "-123.1207"
    },
    members: [1, 4, 8, 15, 23, 42, 56, 89],
    name: "Vancouver Guitar Collective",
    tags: ["music", "guitar", "acoustic", "learning"]
  },
  {
    id: "02",
    image_url: "https://example.com/images/poetry.jpg",
    coordinates: {
      lat: "49.2822",
      lng: "-123.1177"
    },
    members: [2, 7, 12, 19, 25, 31, 45],
    name: "Poetry in Motion Vancouver",
    tags: ["poetry", "literature", "writing", "arts"]
  },
  {
    id: "03",
    image_url: "https://example.com/images/magic.jpg",
    coordinates: {
      lat: "49.2846",
      lng: "-123.1217"
    },
    members: [3, 9, 14, 22, 35, 48, 62, 77, 91],
    name: "Vancouver Magic Circle",
    tags: ["magic", "performance", "entertainment", "learning"]
  },
  {
    id: "04",
    image_url: "https://example.com/images/urban-sketchers.jpg",
    coordinates: {
      lat: "49.2815",
      lng: "-123.1189"
    },
    members: [5, 11, 18, 27, 38, 52, 69],
    name: "Urban Sketchers Vancouver",
    tags: ["art", "drawing", "sketching", "outdoors"]
  },
  {
    id: "05",
    image_url: "https://example.com/images/board-games.jpg",
    coordinates: {
      lat: "49.2724",
      lng: "-123.1169"
    },
    members: [6, 13, 21, 33, 44, 57, 72, 86, 95],
    name: "Vancouver Board Game Society",
    tags: ["games", "board games", "social", "strategy"]
  },
  {
    id: "06",
    image_url: "https://example.com/images/photography.jpg",
    coordinates: {
      lat: "49.2819",
      lng: "-123.1187"
    },
    members: [10, 16, 28, 39, 51, 67, 82],
    name: "Vancouver Street Photography",
    tags: ["photography", "urban", "art", "creative"]
  },
  {
    id: "07",
    image_url: "https://example.com/images/cooking.jpg",
    coordinates: {
      lat: "49.2755",
      lng: "-123.1193"
    },
    members: [17, 24, 36, 47, 59, 73, 88, 96],
    name: "Vancouver Foodie Collective",
    tags: ["cooking", "food", "culinary", "social"]
  },
  {
    id: "08",
    image_url: "https://example.com/images/hiking.jpg",
    coordinates: {
      lat: "49.2874",
      lng: "-123.1215"
    },
    members: [20, 32, 43, 58, 71, 84, 92],
    name: "Vancouver Trail Seekers",
    tags: ["hiking", "outdoors", "adventure", "nature"]
  },
  {
    id: "09",
    image_url: "https://example.com/images/book-club.jpg",
    coordinates: {
      lat: "49.2862",
      lng: "-123.1198"
    },
    members: [26, 37, 49, 63, 76, 87, 94],
    name: "Vancouver Book Exchange",
    tags: ["books", "reading", "literature", "discussion"]
  },
  {
    id: "10",
    image_url: "https://example.com/images/gardening.jpg",
    coordinates: {
      lat: "49.2835",
      lng: "-123.1183"
    },
    members: [29, 41, 54, 68, 79, 85, 93, 97],
    name: "Urban Gardeners Vancouver",
    tags: ["gardening", "sustainability", "nature", "community"]
  }
];

async function main() {
  for (const community of communities) {
    const res = await db.collection('communities').add(community);
    console.log(res);
  }
}

main().then(() => console.log('Success')).catch((err) => console.error(err));

