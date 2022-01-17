type OptionItem = {
  label: string;
  value: string | number;
  [key: string]: any;
};
type TagOptionItem = {
  tag_name: string;
  tag_classify_id: string;
};
type TagItem = {
  is_multiple: number;
  tag_group_name: string;
  custom_arr?: string[];
  tags_outputs: TagOptionItem[];
};

type SortItem = {
  code: string;
  order: string;
  [key: string]: any;
};
