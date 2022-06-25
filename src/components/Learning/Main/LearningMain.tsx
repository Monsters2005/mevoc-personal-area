import React, { useMemo, useState } from 'react';
import { Word } from '../../../@types/entities/Word';
import { stages } from '../../../constants/stages';
import { cloneObj } from '../../../utils/common/cloneObj';
import { countPercentage } from '../../../utils/common/countPercentage';
import { Queue } from '../../../utils/queue/createQueue';
import { ProgressStage } from '../../UI/StagesProgress/StagesProgress';
import StageSelector from '../Stages/StageSelector';
import ThirdStage from '../Stages/ThirdStage/ThirdStage';
import { MAX_MISTAKES_VALUE } from './Core';
import s from './LearningMain.module.scss';

type Props = {
  stage: ProgressStage;
  setActiveStage: (item: ProgressStage) => void;
  words: Word[];
};

export function LearningMain({ setActiveStage, words, stage }: Props) {
  const stageQueue = useMemo(() => new Queue(cloneObj(words) as Word[]), []);
  const [currentWord, setCurrentWord] = useState(stageQueue.getItem());

  function updateProgressStage() {
    const updStage = {
      ...stage,
      progress: Math.round(
        countPercentage(words.length - stageQueue.size(), words.length)
      ),
    };
    setActiveStage(updStage);
  }

  function completeWordHandler(mistakes: number) {
    if (mistakes > MAX_MISTAKES_VALUE) {
      stageQueue.dequeue();
      if (currentWord) stageQueue.enqueue(currentWord);
      setCurrentWord(stageQueue.getItem());
    } else {
      stageQueue.dequeue();
      setCurrentWord(stageQueue.getItem());
      updateProgressStage();
    }
  }

  return (
    <div className={s.learning_container}>
      <StageSelector
        word={currentWord}
        currentStage={stage}
        onComplete={m => completeWordHandler(m)}
      />
    </div>
  );
}
