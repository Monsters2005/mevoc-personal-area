export type Letter = {
  id: number;
  letter: string;
};

export type ActiveAnimation = {
  letterId: number;
  state: 'incorrect' | 'correct';
};

export type Stage = {
  wordLearning: string;
  wordNative: string;
  onComplete: (mistakes: number) => void;
};
