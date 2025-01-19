import { Card, Image, Text } from '@mantine/core';
import { Community } from './Community.interface';
import classes from "@/components/Cards/CommunityCard/Community.module.css"

export function CommunityCard({ id, image, memberAmount, communityName }: Community) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={image}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      {/* <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Norway Fjord Adventures</Text>
        <Badge color="pink">On Sale</Badge>
      </Group> */}

      <Text className={classes.title} fw={300} size="sm" c="dimmed">{memberAmount} members</Text>
      <Text fw={500} size="md">{communityName}</Text>
    </Card>
  );
}