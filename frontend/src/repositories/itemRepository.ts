import { Item } from "@/components/Cards/ItemCard/Item.interface";
import axios from "axios";

const stubGetItemsResponse = [
  {
    id: "i1",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "0.8 km",
    itemName: "Electric Power Drill",
    lender: "David Chen",
    coordinates: {
      lat: 49.2827,
      lng: -123.1207
    }
  },
  {
    id: "i2",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "1.2 km",
    itemName: "Camping Tent (4-Person)",
    lender: "Sarah Johnson",
    coordinates: {
      lat: 49.2482,
      lng: -123.1161
    }
  },
  {
    id: "i3",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "0.3 km",
    itemName: "Mountain Bike",
    lender: "Michael Rodriguez",
    coordinates: {
      lat: 49.2578,
      lng: -123.1639
    }
  },
  {
    id: "i4",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "2.5 km",
    itemName: "Professional Camera",
    lender: "Emma Wilson",
    coordinates: {
      lat: 49.2846,
      lng: -123.1334
    }
  },
  {
    id: "i5",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "1.7 km",
    itemName: "Pressure Washer",
    lender: "James Taylor",
    coordinates: {
      lat: 49.2634,
      lng: -123.1389
    }
  },
  {
    id: "i6",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "0.5 km",
    itemName: "Garden Tools Set",
    lender: "Lisa Park",
    coordinates: {
      lat: 49.2785,
      lng: -123.0887
    }
  },
  {
    id: "i7",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "3.1 km",
    itemName: "BBQ Grill",
    lender: "Alex Thompson",
    coordinates: {
      lat: 49.2688,
      lng: -123.1565
    }
  },
  {
    id: "i8",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "1.4 km",
    itemName: "Ladder (6m)",
    lender: "Maria Garcia",
    coordinates: {
      lat: 49.2571,
      lng: -123.1237
    }
  },
  {
    id: "i9",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "0.9 km",
    itemName: "Moving Dolly",
    lender: "Chris Anderson",
    coordinates: {
      lat: 49.2678,
      lng: -123.1289
    }
  },
  {
    id: "i10",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "2.8 km",
    itemName: "Table Tennis Set",
    lender: "Nina Patel",
    coordinates: {
      lat: 49.2813,
      lng: -123.1148
    }
  }
];

// export async function getItems(): Promise<Item[]> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(stubGetItemsResponse);
//     }, 2000);
//   })
// }
export async function getItems(): Promise<Item[]> {
  try {
    const response = await axios.get('http://localhost:8080/item');
    console.log(response);
    // get first 20 items
    return response.data.docs.slice(0, 20);
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
}