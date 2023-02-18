export type WordpackWord = {
  id: number;
  word: string;
};

export type WordpackWordEnriched = {
  id: number;
  wordNative: string;
  wordLearning: string;
  dateLearned: null | string;
};
