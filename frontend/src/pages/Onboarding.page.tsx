import { useGetInterestsQuery, usePostInterestsMutation } from "@/queries/interest.query";
import { Chip, Group, Paper, Stack, Text, Title } from "@mantine/core";

export function OnboardingPage() {
  const { isLoading: isLoadingInterests, isSuccess: isSuccessInterests, data: interests } = useGetInterestsQuery();
  const postInterestsMutation = usePostInterestsMutation();
  return (
    <Stack>
      <Paper shadow="xs" radius="xl" p="xl">
        <Text>Paper is the most basic ui component</Text>
        <Text>
          Use it to create cards, dropdowns, modals and other components that require background
          with shadow
        </Text>
      </Paper>

      <Title order={2}>
        Interest
      </Title>
      <Group gap="md">
        {isLoadingInterests && <Text>Loading interests...</Text>}
        {isSuccessInterests && interests.map((interest, index) => (
          <Chip key={`${interest}-${index}`} color="blue" variant="filled" size="md">{interest}
          </Chip>
        ))}
      </Group>
    </Stack>
  );
}