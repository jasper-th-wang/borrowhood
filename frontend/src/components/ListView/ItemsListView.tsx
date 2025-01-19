import { Loader, SimpleGrid } from "@mantine/core";
import { useGetItemsQuery } from "@/queries/item.query";
import { ItemCard } from "../Cards/ItemCard/ItemCard";

export function ItemsListView() {
  const { isLoading, isError, data: items } = useGetItemsQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    throw new Error("Error loading items");
  }


  return (
    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 5 }}>
      {
        items?.map((item) => (
          <ItemCard
            key={item.id}
            image_url={item.image}
            owner_id={item.owner_id}
            title={item.title}
          />
        ))
      }
    </SimpleGrid>
  )
}