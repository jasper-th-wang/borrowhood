import { apiClient } from "./apiClient";
import {Item} from "@/interfaces/main";

export async function getItems(): Promise<Item[]> {
  try {
    const response = await apiClient.get('/item');
    console.log(response);
    const results: Item[] = response.data;
    return results;
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
}