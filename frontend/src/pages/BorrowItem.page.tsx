import { use, useEffect, useState } from 'react';
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
import { data } from 'react-router-dom';

export const BorrowItemPage = () => {
  const [description, setDescription] = useState<string>('');
  const [sendRequestButton, setSendRequestButton] = useState<string>('Send Request');
  const [isSent, setIsSent] = useState<boolean>(false);

  const [form, setForm] = useState<BorrowItemForm>({
    imageUrl: 'https://raw.githubusercontent.com/avkap007/borrowhood/refs/heads/main/docs/images/items/books.jpeg',
    tags: ['Book', 'Realism', 'Romance', 'Reading'],
    description: description,
    conditions: []
  });

  useEffect(() => {
     fetch('http://localhost:8080/item/102')
     .then(res => res.json())
     .then(data => {
        console.log(data);
        setForm({...form, description: data.Item.description});
    });
  }, []); 
  

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
          {
            isSent ? <Button size="lg" disabled>Request Sent</Button> : 
            <Button size="lg" onClick={() => {
              setSendRequestButton('Request Sent');
              setIsSent(true);
            }}>{sendRequestButton}</Button>
          }
          </Group>
      </Grid.Col>
    </Grid>
  );
};

export default BorrowItemPage;
