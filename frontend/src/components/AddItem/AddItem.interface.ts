export interface AddItemForm {
  imageUrl: string;
  tags: string[];
  description: string;
  conditions: string[];
}

export interface TagOption {
  value: string;
  label: string;
}

export interface ConditionOption {
  value: string;
  label: string;
}
