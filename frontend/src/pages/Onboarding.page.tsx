import { useGetInterestsQuery, usePostInterestsMutation } from "@/queries/interest.query";
import { Button, Chip, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";

export function OnboardingPage() {
  const { isLoading: isLoadingInterests, isSuccess: isSuccessInterests, data: interests } = useGetInterestsQuery();
  const postInterestsMutation = usePostInterestsMutation();
  const [value, setValue] = useState<string[]>([]);
  const handleSave = () => {
    postInterestsMutation.mutate(value);
  }
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
          <Chip.Group multiple value={value} onChange={setValue}>
            <Chip key={`${interest}-${index}`} color="blue" variant="filled" size="md" value={interest}>{interest}
            </Chip>
          </Chip.Group>
        ))}
      </Group>
      <Button onClick={handleSave} loading={postInterestsMutation.isPending}>
        Save
      </Button>
    </Stack>
  );
}