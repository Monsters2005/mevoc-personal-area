export type Letter = {
  id: number;
  letter: string;
};

export type ActiveAnimation = {
  letterId: number;
  state: 'incorrect' | 'correct';
};
