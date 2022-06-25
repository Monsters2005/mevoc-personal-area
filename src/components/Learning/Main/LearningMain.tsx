import React, { useEffect, useMemo, useState } from 'react';
import { Word } from '../../../@types/entities/Word';
import { stages } from '../../../constants/stages';
import { Queue } from '../../../utils/queue/createQueue';
import { ProgressStage } from '../../UI/StagesProgress/StagesProgress';
import FirstStage from '../Stages/FirstStage/FirstStage';
import { getAllLetters } from '../Stages/handlers';
import SecondStage from '../Stages/SecondStage/SecondStage';
import ThirdStage from '../Stages/ThirdStage/ThirdStage';
import { LearningCore, LearningEvent } from './Core';
import s from './LearningMain.module.scss';

type Props = {
  stage: ProgressStage;
  setActiveStage: (item: ProgressStage) => void;
  words: Word[];
};

export function LearningMain({ setActiveStage, words, stage }: Props) {
  const stageQueue = useMemo(() => new Queue(words), []);

  return (
    <div className={s.learning_container}>
      <ThirdStage
        word={stageQueue.getItem()}
        currentStage={stage}
        onComplete={() => setActiveStage(stages[1])}
      />
    </div>
  );
}
