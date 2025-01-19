import { Autocomplete } from "@mantine/core";
import classes from "@/components/SearchBar/SearchBar.module.css";

export function SearchBar() {
  return (
    <div>
      <Autocomplete
        placeholder="What are you looking for today?"
        classNames={{
          input: classes.input
        }}
      />
    </div>
  );
}
