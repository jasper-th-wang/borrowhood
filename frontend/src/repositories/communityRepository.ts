import { Community } from "@/components/Cards/CommunityCard/Community.interface";
import { apiClient } from "./apiClient";


export async function getCommunities(): Promise<Community[]> {
  try {
    const response = await apiClient.get('/community');
    console.log(response);
    const results: any[] = response.data.groups;
    // get first 20 items
    return results;
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
}