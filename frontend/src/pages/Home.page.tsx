import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useAppStore } from '@/store';
import { ItemsListView } from '@/components/ListView/ItemsListView';
import { CommunitiesListView } from '@/components/ListView/CommunitiesListView';
import { CategoryFocusSelector } from '@/components/CategoryFocusSelector/CategoryFocusSelector';
import { Flex, Stack } from '@mantine/core';

export function HomePage() {
  const { categoryFocus } = useAppStore();
  return (
    <div>
      <Stack>
        <SearchBar />
        <CategoryFocusSelector />
        <Flex justify="center" align="center">
          {
            categoryFocus === 'items' && (<ItemsListView />)
          }
          {
            categoryFocus === 'communities' && (<CommunitiesListView />)
          }
        </Flex>
      </Stack>
      {/* <Welcome />
      <ColorSchemeToggle /> */}
    </div>
  );
}
