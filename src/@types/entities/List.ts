import { Word } from './Word';

export type List = {
  name: string;
  id: string;
  words: Word[];
  progress: number;
};
