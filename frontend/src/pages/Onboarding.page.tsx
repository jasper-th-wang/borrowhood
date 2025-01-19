import { useGetInterestsQuery, usePostInterestsMutation } from "@/queries/interest.query";
import { Button, Chip, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoanimate from '@/assets/logos/welcomesmall.gif';
import classes from './Onboarding.module.css';

export function OnboardingPage() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isLoading: isLoadingInterests, isSuccess: isSuccessInterests, data: interests } = useGetInterestsQuery();
  const postInterestsMutation = usePostInterestsMutation();
  const [value, setValue] = useState<string[]>([]);
  const handleSave = () => {
    postInterestsMutation.mutate(value);
  }

  useEffect(() => {
    if (postInterestsMutation.isSuccess) {
      navigate('/');
    }
  }
    , [postInterestsMutation.isSuccess]);
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
        {isSuccessInterests &&
          showAll &&
          interests.map((interest, index) => (
            <Chip.Group multiple value={value} onChange={setValue}>
              <Chip key={`${interest}-${index}`} size="md" value={interest}>{interest}
              </Chip>
            </Chip.Group>
          ))}
        {isSuccessInterests &&
          !showAll &&
          interests.slice(0, 10).map((interest, index) => (
            <Chip.Group multiple value={value} onChange={setValue}>
              <Chip key={`${interest}-${index}`} size="md" value={interest}>{interest}
              </Chip>
            </Chip.Group>
          ))}
        <Button onClick={() => setShowAll((prev) => !prev)}>
          {
            showAll ? "Hide Some" : "Show All"
          }
        </Button>
      </Group>
      <Button onClick={handleSave} loading={postInterestsMutation.isPending}>
        Save
      </Button>
      <img src={logoanimate} alt="" className={classes.logoanimate} />

    </Stack>
  );
}