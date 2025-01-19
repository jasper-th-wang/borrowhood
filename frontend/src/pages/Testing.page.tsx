// import { CommunitiesListView } from "@/components/ListView/CommunitiesListView";
import { ItemsListView } from "@/components/ListView/ItemsListView";
import { Flex } from "@mantine/core";

export function TestingPage() {
  return (
    <Flex justify="center" align="center">
      {/* <CommunitiesListView /> */}
      <ItemsListView />
    </Flex>
  );
}
