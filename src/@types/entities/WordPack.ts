import { WordpackWord, WordpackWordEnriched } from './WordpackWord';

export type Pack = {
  name: string;
  id: number;
  words: Array<WordpackWord>;
  icon?: string;
};

export type PackEnriched = {
  name: string;
  id: number;
  words: Array<WordpackWordEnriched>;
  icon?: string;
};
