import { useAppStore } from "@/store";
import { Button } from "@mantine/core";
import classes from "@/components/MapListFocusSelector/MapListFocusSelector.module.css";

export function MapListFocusSelector() {
  const { mapListFocus, setMapListFocus } = useAppStore();
  const handleMapListFocusToggle = () => {
    setMapListFocus(mapListFocus === 'map' ? 'list' : 'map');
  }
  return (
    <Button
      classNames={{
        root: classes.root
      }}
      onClick={handleMapListFocusToggle} variant="filled" color="gray" size="lg" radius="xl">
      {mapListFocus === 'map' ? 'Show List' : 'Show Map'}
    </Button>
  )
}