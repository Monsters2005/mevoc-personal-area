import { WordpackWord } from './WordpackWord';

export type Pack = {
  name: string;
  id: number;
  words: Array<WordpackWord>;
  icon?: string;
};
