import { apiClient } from "./apiClient";
import {Community} from "@/interfaces/main";


export async function getCommunities(): Promise<Community[]> {
  try {
    const response = await apiClient.get('/community');
    console.log(response);
    const results: Community[] = response.data;
    // get first 20 items
    return results;
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
}