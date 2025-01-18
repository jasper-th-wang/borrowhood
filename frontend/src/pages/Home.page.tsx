import { SearchBar } from '@/components/SearchBar/SearchBar';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export function HomePage() {
  return (
    <div>
      <SearchBar />
      <Welcome />
      <ColorSchemeToggle />
    </div>
  );
}
