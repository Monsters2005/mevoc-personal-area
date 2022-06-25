import { Word } from '../../../@types/entities/Word';
import { ProgressStage } from '../../UI/StagesProgress/StagesProgress';

export type Letter = {
  id: number;
  letter: string;
};

export type ActiveAnimation = {
  letterId: number;
  state: 'incorrect' | 'correct';
};

export type Stage = {
  word: Word | null;
  currentStage: ProgressStage;
  onComplete: (mistakes: number) => void;
};
