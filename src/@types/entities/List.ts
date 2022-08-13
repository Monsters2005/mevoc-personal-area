import { Word } from './Word';

export type List = {
  name: string;
  id: number;
  words: Word[];
  progress: number;
  learningLang: string;
};
