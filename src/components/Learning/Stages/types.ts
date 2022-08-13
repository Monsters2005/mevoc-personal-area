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

type OnStageComplete<T> = (mistakes: T) => void;

export type StageSelect = {
  word: Word | null;
  currentStage: ProgressStage;
  onStageComplete: OnStageComplete<number>;
  onTestComplete: OnStageComplete<number>;
};

export type Stage = {
  word: Word | null;
  currentStage: ProgressStage;
  onComplete: OnStageComplete<number>;
};
