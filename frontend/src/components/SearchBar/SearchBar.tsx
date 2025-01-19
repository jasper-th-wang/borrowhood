import { Autocomplete } from "@mantine/core";
import classes from "@/components/SearchBar/SearchBar.module.css";

export function SearchBar() {
  return (
    <div>
      <Autocomplete
        label="Your favorite library"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        classNames={{
          input: classes.input
        }}
      />
    </div>
  );
}
