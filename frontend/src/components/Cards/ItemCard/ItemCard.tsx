import { Card, Image, Text } from '@mantine/core';
import { Item } from './Item.interface';
import classes from "@/components/Cards/ItemCard/Item.module.css"
export function ItemCard({ id, image, distance, itemName, lender }: Item) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={image}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Text className={classes.title} fw={300} size="sm" c="dimmed">{distance}</Text>
      <Text fw={500} size="md">{itemName}</Text>
      <Text fw={300} size="md">{lender}</Text>
    </Card>
  );
}