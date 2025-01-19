import { Card, Image, Text } from '@mantine/core';
import classes from "@/components/Cards/CommunityCard/Community.module.css"

export function CommunityCard({ image_url, members, name }: { image_url: string, members: number[], name: string }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={image_url}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      {/* <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Norway Fjord Adventures</Text>
        <Badge color="pink">On Sale</Badge>
      </Group> */}

      <Text className={classes.title} fw={300} size="sm" c="dimmed">{members.length} members</Text>
      <Text fw={500} size="md">{name}</Text>
    </Card>
  );
}