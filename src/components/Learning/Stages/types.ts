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

type OnStageComplete = (mistakes: number) => void;

export type StageSelect = {
  word: Word | null;
  currentStage: ProgressStage;
  onStageComplete: OnStageComplete;
  onTestComplete: OnStageComplete;
};

export type Stage = {
  word: Word | null;
  currentStage: ProgressStage;
  onComplete: OnStageComplete;
};
