import { useState } from 'react';
import {
  Grid,
  Image,
  Checkbox,
  Button,
  Group,
  Stack,
  Title,
  Text,
  TagsInput,
  Textarea,
  Select,
  Chip
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { AddItemForm, TagOption, ConditionOption } from '../components/AddItem/AddItem.interface';
import { useGetInterestsQuery } from '@/queries/interest.query';
import classes from '@/pages/AddItem.module.css';

export const AddItemPage = () => {
  const { isLoading: isLoadingInterests, isSuccess: isSuccessInterests, data: interests } = useGetInterestsQuery();
  const [form, setForm] = useState<AddItemForm>({
    imageUrl: '',
    tags: [],
    description: '',
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

  const handleConditionChange = (condition: string) => {
    setForm({
      ...form,
      conditions: form.conditions.includes(condition)
        ? form.conditions.filter(c => c !== condition)
        : [...form.conditions, condition]
    });
  };

  return (
    <Grid p="md" mih="100vh">
      <Grid.Col span={{ sm: 12, md: 6 }} >
        <Stack>
          <Dropzone
            onDrop={(files: FileWithPath[]) => handleImageUpload(files[0])}
            onReject={() => alert('Invalid file type')}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            maxFiles={1}
            styles={{
              root: {
                border: '2px dashed var(--mantine-color-gray-4)',
                borderRadius: 'var(--mantine-radius-md)',
                '&:hover': {
                  borderColor: 'var(--mantine-color-blue-4)',
                  backgroundColor: 'var(--mantine-color-blue-0)',
                },
                '&[data-accept]': {
                  borderColor: 'var(--mantine-color-blue-6)',
                  backgroundColor: 'var(--mantine-color-blue-1)',
                },
                '&[data-reject]': {
                  borderColor: 'var(--mantine-color-red-6)',
                  backgroundColor: 'var(--mantine-color-red-1)',
                },
              },
            }}
          >
            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
              {form.imageUrl ? (
                <Image
                  src={form.imageUrl}
                  alt="Uploaded"
                  radius="md"
                  height={300}
                  fit="contain"
                />
              ) : (
                <>
                  <Dropzone.Accept>
                    <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Attach as many files as you like, each file should not exceed 5mb
                    </Text>
                  </div>
                </>
              )}
            </Group>
          </Dropzone>
        </Stack>

        <Stack mt="xl">
          <Title order={3}>Categories that best describe this item</Title>
          <Group gap="md" bg="purple.0" p="xl" classNames={{ root: classes.categoryRoot }}>
            {isLoadingInterests && <Text>Loading interests...</Text>}
            {isSuccessInterests && interests.map((interest, index) => (
              <Chip.Group multiple value={form.tags} onChange={(tags) => setForm({ ...form, tags })}>
                <Chip key={`${interest}-${index}`} size="md" value={interest}>{interest}
                </Chip>
              </Chip.Group>
            ))}
            <Button>Show All</Button>
          </Group>
          {/* <TagsInput
            placeholder="Pick categories"
            value={form.tags}
            onChange={(tags) => setForm({ ...form, tags })}
            clearable
          /> */}
        </Stack>
      </Grid.Col>

      <Grid.Col span={{ sm: 12, md: 6 }}>
        <Title order={3}>About the item</Title>
        <Textarea
          value={form.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm({ ...form, description: e.target.value })}
          placeholder="Enter item description..."
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
          <Button size="lg">Save Item</Button>
        </Group>
      </Grid.Col>
    </Grid>
  );
};

export default AddItemPage;
