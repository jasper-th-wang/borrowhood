import { Item } from "@/components/Cards/ItemCard/Item.interface";
import { apiClient } from "./apiClient";

export async function getItems(): Promise<Item[]> {
  try {
    const response = await apiClient.get('/item');
    console.log(response);
    const results: Item[] = response.data.docs;
    return results;
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
}