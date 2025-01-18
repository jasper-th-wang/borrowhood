import { SimpleGrid } from "@mantine/core";
import { ItemCard } from "../Cards/ItemCard/ItemCard";

export function ListView() {
  return (
    <SimpleGrid cols={2}>
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </SimpleGrid>
  )
}