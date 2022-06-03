export type Page = {
  icon: string;
  name: string;
  path: string;
  key: string;
};

export type ActionItem = {
  label: string;
  action: () => void;
  icon: string;
  key: string;
};

export type Pages = Record<string, Omit<Page, 'key'>>;
