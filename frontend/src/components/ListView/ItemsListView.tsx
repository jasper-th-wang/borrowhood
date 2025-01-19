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
            id={item.id}
            image={item.image}
            distance={item.distance}
            itemName={item.itemName}
            lender={item.lender}
          />
        ))
      }
    </SimpleGrid>
  )
}