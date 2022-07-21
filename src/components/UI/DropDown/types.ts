import { ReactNode } from 'react';

export type Option = {
  value: string;
  details?: string;
  icon?: ReactNode;
  addition?: ReactNode;
  id: number;
};
