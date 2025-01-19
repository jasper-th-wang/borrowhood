import { useAppStore } from "@/store";
import { SegmentedControl } from "@mantine/core";

export function CategoryFocusSelector() {
  const { categoryFocus, setCategoryFocus } = useAppStore();

  const handleSegmentedControlChange = (value: string) => {
    setCategoryFocus(value as 'items' | 'communities');
  }

  return (
    <SegmentedControl
      value={categoryFocus}
      data={[
        { value: 'items', label: 'Items' },
        { value: 'communities', label: 'Communities' },
      ]}
      onChange={handleSegmentedControlChange} />
  )
}