import { Card, Image, Text } from '@mantine/core';
import classes from "@/components/Cards/ItemCard/Item.module.css"
import {Item} from "@/interfaces/main";
const imageNames = [
  'binoculars.jpg',
  'books.jpeg',
  'console.jpg',
  'gardening.jpg',
  'gopro.jpg',
  'guitar.jpg',
  'paddleboard.jpg',
  'projector.jpg',
  'sewing.jpg',
  'tennis.jpg'
];
export function ItemCard({ image_url, owner_id, title }: { image_url: string, owner_id: string, title: string }) {
  // pick random image
  const randomIndex = Math.floor(Math.random() * imageNames.length);
  const randomImageName = imageNames[randomIndex];
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={image_url}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Text className={classes.title} fw={300} size="sm" c="dimmed">2 km</Text>
      <Text fw={500} size="md">{title}</Text>
      <Text fw={300} size="md">{owner_id}</Text>
    </Card>
  );
}