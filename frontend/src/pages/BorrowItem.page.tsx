import { useState } from 'react';
import { 
  Grid,
  Image,
  Button,
  Group,
  Stack,
  Title,
  TagsInput,
  Textarea,
  Select
} from '@mantine/core';
import { BorrowItemForm, ConditionOption } from '../components/BorrowItem/BorrowItem.interface';

export const BorrowItemPage = () => {
  const [form, setForm] = useState<BorrowItemForm>({
    imageUrl: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
    tags: ['Book', 'Realism', 'Romance', 'Reading'],
    description: 'I am a HARD CORE Sally Roony fan but was on #100+ in the library, so now I am a proud owner of yet another book! RIP Down to swap, chat over coffee, or just gush about it  endlessly--let\'s make it happen!',
    conditions: []
  });

  const conditionOptions: ConditionOption[] = [
    { value: 'Borrow this book, and let’s talk about it over coffee', label: 'Borrow this book, and let’s talk about it over coffee' },
    { value: 'Rent for 5 borrowbucks', label: 'Rent for 5 borrowbucks' },
    { value: 'Exchange this item with another item you love!', label: 'Exchange this item with another item you love!' }
  ];

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setForm({ ...form, imageUrl });
    }
  };

  const handleTagChange = (tag: string) => {
    setForm({
      ...form,
      tags: form.tags.includes(tag)
        ? form.tags.filter(t => t !== tag)
        : [...form.tags, tag]
    });
  };

  // const handleConditionChange = (condition: string) => {
  //   setForm({
  //     ...form,
  //     conditions: form.conditions.includes(condition)
  //       ? form.conditions.filter(c => c !== condition)
  //       : [...form.conditions, condition]
  //   });
  // };

  return (
    <Grid p="md" mih="100vh">
      <Grid.Col span={6}>
        <Stack>
          <Image 
            src={form.imageUrl} 
            alt="Default" 
            radius="md"
            height={300}
            fit="contain"
          />
        </Stack>

        <Stack mt="xl">
          <Title order={3}>Categories that best describe this item</Title>
          <TagsInput
            value={form.tags}
            readOnly
          />
        </Stack>
      </Grid.Col>

      <Grid.Col span={6}>
        <Title order={3}>About the item</Title>
          <Textarea
            value={form.description}
            readOnly
            placeholder="Item description"
            autosize
            minRows={4}
            maxRows={8}
          />

        <Stack mt="xl">
          <Title order={3}>Set Rental Terms</Title>
          <Select
            label="Select rental terms"
            placeholder="Choose terms"
            data={conditionOptions}
            value={form.conditions[0] || null}
            onChange={(value) => {
              if (value) {
                setForm({
                  ...form,
                  conditions: [value]
                });
              }
            }}
            clearable
          />
        </Stack>

        <Group justify="flex-end" mt="xl">
          <Button size="lg">Send Request</Button>
        </Group>
      </Grid.Col>
    </Grid>
  );
};

export default BorrowItemPage;
