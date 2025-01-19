// import apiClient from '@/repositories/apiClient';

import { Community } from "@/components/Cards/CommunityCard/Community.interface";
import axios from "axios";

const stubCoordinates = [
  { lat: 49.2827, lng: -123.1207 }, // Downtown Vancouver
  { lat: 49.2684, lng: -123.1683 }, // Kitsilano
  { lat: 49.2634, lng: -123.1003 }, // Mount Pleasant
  { lat: 49.2897, lng: -123.1276 }, // Coal Harbour
  { lat: 49.2440, lng: -123.1236 }, // Fairview
  { lat: 49.2795, lng: -123.0700 }, // Hastings-Sunrise
  { lat: 49.2571, lng: -123.1389 }, // South Granville
  { lat: 49.2646, lng: -123.1707 }, // Point Grey
  { lat: 49.2483, lng: -123.0733 }, // Commercial Drive
  { lat: 49.2763, lng: -123.1306 }  // West End
]
// export async function getCommunities(): Promise<Community[]> {
//   // return Promise.resolve(stubGetCommunitiesResponse)
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(stubGetCommunitiesResponse);
//     }, 2000);
//   })
// }

export async function getCommunities(): Promise<Community[]> {
  try {
    const response = await axios.get('http://localhost:8080/recommendations/1');
    console.log(response);
    const results: any[] = response.data.groups;
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