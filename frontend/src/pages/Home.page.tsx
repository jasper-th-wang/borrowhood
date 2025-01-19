import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useAppStore } from '@/store';
import { ItemsListView } from '@/components/ListView/ItemsListView';
import { CommunitiesListView } from '@/components/ListView/CommunitiesListView';
import { CategoryFocusSelector } from '@/components/CategoryFocusSelector/CategoryFocusSelector';
import { Stack } from '@mantine/core';

export function HomePage() {
  const { categoryFocus } = useAppStore();
  return (
    <div>
      <Stack>
        <SearchBar />
        <CategoryFocusSelector />
        {
          categoryFocus === 'items' && (<ItemsListView />)
        }
        {
          categoryFocus === 'communities' && (<CommunitiesListView />)
        }
      </Stack>
      {/* <Welcome />
      <ColorSchemeToggle /> */}
    </div>
  );
}
