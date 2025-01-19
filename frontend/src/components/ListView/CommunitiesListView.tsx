import { Loader, SimpleGrid } from "@mantine/core";
import { CommunityCard } from "../Cards/CommunityCard/CommunityCard";
import { useGetCommunitiesQuery } from "@/queries/community.query";

export function CommunitiesListView() {
  const { isLoading, isError, data: communities } = useGetCommunitiesQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    throw new Error("Error loading communities");
  }


  return (
    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 5 }}>
      {
        communities?.map((community) => (
          <CommunityCard
            key={community.id}
            id={community.id}
            image={community.image}
            memberAmount={community.memberAmount}
            communityName={community.communityName}
            coordinates={community.coordinates}
          />
        ))
      }
    </SimpleGrid>
  )
}