import { Loader, SimpleGrid } from "@mantine/core";
import { CommunityCard } from "../Cards/CommunityCard/CommunityCard";
import { useGetCommunitiesQueries } from "@/queries/community.query";

export function ListView() {
  const { isLoading, isError, data: communities } = useGetCommunitiesQueries();

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
          />
        ))
      }
      <CommunityCard id="1" image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" communityName="Book Club: Romance" memberAmount="50+" />
      <CommunityCard id="1" image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" communityName="Book Club: Romance" memberAmount="50+" />
      <CommunityCard id="1" image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" communityName="Book Club: Romance" memberAmount="50+" />
      <CommunityCard id="1" image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" communityName="Book Club: Romance" memberAmount="50+" />
    </SimpleGrid>
  )
}