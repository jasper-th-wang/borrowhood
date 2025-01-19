import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useAppStore } from '@/store';
import { ItemsListView } from '@/components/ListView/ItemsListView';
import { CommunitiesListView } from '@/components/ListView/CommunitiesListView';
import { CategoryFocusSelector } from '@/components/CategoryFocusSelector/CategoryFocusSelector';
import { Button, Flex, Stack } from '@mantine/core';
import { MapListFocusSelector } from '@/components/MapListFocusSelector/MapListFocusSelector';

export function HomePage() {
  const { categoryFocus, mapListFocus } = useAppStore();
  return (
    <div>
      <Stack>
        <SearchBar />
        <CategoryFocusSelector />
        <Flex justify="center" align="center">
          {
            categoryFocus === 'items' && mapListFocus === 'list' && (<ItemsListView />)
          }
          {
            categoryFocus === 'communities' && mapListFocus === 'list' && (<CommunitiesListView />)
          }
        </Flex>
      </Stack>
      <MapListFocusSelector />
    </div>
  );
}
