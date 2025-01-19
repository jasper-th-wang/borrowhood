import { useState, useMemo } from 'react';
import { 
  Grid,
  Image,
  Checkbox,
  Button,
  Group,
  Stack,
  Title,
  Text,
  TagsInput
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { AddItemForm, TagOption, ConditionOption } from '../components/AddItem/AddItem.interface';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';

import { Textarea } from '@mantine/core';

export const AddItemPage = () => {
  const [count, setCount] = useState<number>(101);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [image_data , setImageData] = useState<string>('');
  const [form, setForm] = useState<AddItemForm>({
    imageUrl: '',
    tags: [],
    description: '',
    conditions: []
  });

  const conditionOptions: ConditionOption[] = [
    { value: 'free', label: 'Free' },
    { value: 'exchange', label: 'Exchange' },
    { value: 'rent', label: 'Rent' }
  ];

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Enter item description...',
      }),
      Underline,
      Highlight
    ],
    content: form.description,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setForm({ ...form, description: JSON.stringify(json) });
    },
  });

  const handleSaveItem = () => {

 
    setCount(count + 1);
    const formData = new FormData();

    formData.append('id',count);
    formData.append('description', description);
    formData.append('image', file as Blob);
    formData.append('tags', form.tags.join(','));
    formData.append('conditions', form.conditions.join(','));
    formData.append('user_id', 1);
    formData.append('rentalTerms', conditionOptions.map((condition) => condition.value).join(','));

    fetch('http://localhost:8080/item', {
      method: 'POST',
      body: formData,
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  const handleImageUpload = async (file: File | null) => {
    const formData = new FormData();
    setFile(file);
    formData.append('image', file as Blob);
    //formData.set('image_data', file);

    const res = await fetch("http://localhost:8080/image/annotate", {
      method: "POST",
      body: formData
    });

    if (res.ok) {
      res.json().then(data => {
        console.log(data.message.choices[0].message.content);
        setDescription(data.message.choices[0].message.content);

        //const tagoptions = data.tags.map((tag: String, index: number) => {
        //  "<option value=" + tag + ">" + tag + "</option>";
        //})
        setForm({ ...form, tags: data.tags });

    });
    } else {
      console.log("error");
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
      <Grid.Col span={6}>
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
          <TagsInput
            placeholder="Pick categories"
            value={form.tags}
            onChange={(tags) => {
              setForm({ ...form, tags });
              console.log(tags);
            }}
            clearable
          />
        </Stack>
      </Grid.Col>

      <Grid.Col span={6}>
        <Stack>
          <Title order={3}>About the item</Title>
          {/* <RichTextEditor editor={editor} variant="subtle">
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content >{description}</RichTextEditor.Content>
          </RichTextEditor> */}

          <Textarea
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            placeholder="Enter item description..."
            
            radius="md"
            />
        </Stack>

        <Stack mt="xl">
          <Title order={3}>Transaction Conditions</Title>
          <Group>
            {conditionOptions.map(condition => (
              <Checkbox
                key={condition.value}
                label={condition.label}
                checked={form.conditions.includes(condition.value)}
                onChange={() => handleConditionChange(condition.value)}
              />
            ))}
          </Group>
        </Stack>

        <Group justify="flex-end" mt="xl">
          <Button onClick={handleSaveItem} size="lg">Save Item</Button>
        </Group>
      </Grid.Col>
    </Grid>
  );
};

export default AddItemPage;
