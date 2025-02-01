import { db } from '../firebase';
import 'dotenv/config';

const items = [
  {
    id: '01',
    image: 'https://example.com/images/bike1.jpg',
    coordinates: {
      lat: '49.2827',
      lng: '-123.1207',
    },
    ownerId: 'user123',
    title: 'Mountain Bike',
    rental_terms: ['24h minimum', 'deposit required', 'pickup only'],
    tags: ['outdoor', 'sports', 'bicycle'],
  },
  {
    id: '02',
    image: 'https://example.com/images/camera1.jpg',
    coordinates: {
      lat: '49.2822',
      lng: '-123.1177',
    },
    ownerId: 'user456',
    title: 'DSLR Camera',
    rental_terms: ['3 day minimum', 'ID required', 'insurance needed'],
    tags: ['electronics', 'photography', 'professional'],
  },
  {
    id: '03',
    image: 'https://example.com/images/tent1.jpg',
    coordinates: {
      lat: '49.2846',
      lng: '-123.1217',
    },
    ownerId: 'user789',
    title: '4-Person Tent',
    rental_terms: ['weekly rental', 'cleaning fee'],
    tags: ['camping', 'outdoor', 'gear'],
  },
  {
    id: '04',
    image: 'https://example.com/images/projector1.jpg',
    coordinates: {
      lat: '49.2815',
      lng: '-123.1189',
    },
    ownerId: 'user101',
    title: 'HD Projector',
    rental_terms: ['weekend package', 'setup available'],
    tags: ['electronics', 'entertainment', 'events'],
  },
  {
    id: '05',
    image: 'https://example.com/images/kayak1.jpg',
    coordinates: {
      lat: '49.2724',
      lng: '-123.1169',
    },
    ownerId: 'user202',
    title: 'Tandem Kayak',
    rental_terms: ['hourly rate', 'life jackets included'],
    tags: ['water sports', 'outdoor', 'summer'],
  },
  {
    id: '06',
    image: 'https://example.com/images/tools1.jpg',
    coordinates: {
      lat: '49.2819',
      lng: '-123.1187',
    },
    ownerId: 'user303',
    title: 'Power Tool Set',
    rental_terms: ['same day return', 'damage waiver'],
    tags: ['tools', 'DIY', 'construction'],
  },
  {
    id: '07',
    image: 'https://example.com/images/guitar1.jpg',
    coordinates: {
      lat: '49.2755',
      lng: '-123.1193',
    },
    ownerId: 'user404',
    title: 'Acoustic Guitar',
    rental_terms: ['monthly available', 'beginner friendly'],
    tags: ['music', 'instrument', 'entertainment'],
  },
  {
    id: '08',
    image: 'https://example.com/images/snowboard1.jpg',
    coordinates: {
      lat: '49.2874',
      lng: '-123.1215',
    },
    ownerId: 'user505',
    title: 'Snowboard Kit',
    rental_terms: ['seasonal rental', 'maintenance included'],
    tags: ['winter sports', 'outdoor', 'equipment'],
  },
  {
    id: '09',
    image: 'https://example.com/images/drone1.jpg',
    coordinates: {
      lat: '49.2862',
      lng: '-123.1198',
    },
    ownerId: 'user606',
    title: '4K Drone',
    rental_terms: ['training required', 'liability insurance'],
    tags: ['electronics', 'photography', 'aerial'],
  },
  {
    id: '10',
    image: 'https://example.com/images/party1.jpg',
    coordinates: {
      lat: '49.2835',
      lng: '-123.1183',
    },
    ownerId: 'user707',
    title: 'Party Equipment Set',
    rental_terms: ['delivery available', 'weekend discount'],
    tags: ['events', 'entertainment', 'party'],
  },
];

async function main() {
  for (const item of items) {
    const res = await db.collection('items').add(item);
    console.log(res);
  }
}

main().then(() => console.log('Success')).catch((err) => console.error(err));

