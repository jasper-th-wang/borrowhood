import {apiClient} from "./apiClient";
import {Item} from "@/interfaces/main";
export async function getItems(): Promise<Item[]> {
  try {
    const response = await apiClient.get('/item');
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
}

export async function createItem(formData: FormData): Promise<Item> {
  try {
    const response = await apiClient.post('/item', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create item');
  }
}