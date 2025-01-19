import { Item } from "@/components/Cards/ItemCard/Item.interface";
import axios from "axios";

const stubCoordinates = [
  { lat: 49.2827, lng: -123.1207 },
  { lat: 49.2482, lng: -123.1161 },
  { lat: 49.2578, lng: -123.1639 },
  { lat: 49.2846, lng: -123.1334 },
  { lat: 49.2634, lng: -123.1389 },
  { lat: 49.2785, lng: -123.0887 },
  { lat: 49.2688, lng: -123.1565 },
  { lat: 49.2571, lng: -123.1237 },
  { lat: 49.2678, lng: -123.1289 },
  { lat: 49.2813, lng: -123.1148 }
]

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
    const results: any[] = response.data.docs;
    // get first 20 items
    return results.slice(0, 9).map((doc, index) => {
      return {
        ...doc,
        latt: stubCoordinates[index].lat,
        long: stubCoordinates[index].lng,
      }
    });
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
}