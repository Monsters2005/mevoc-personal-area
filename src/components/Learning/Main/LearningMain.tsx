import React, { useEffect, useMemo, useState } from 'react';
import { Word } from '../../../@types/entities/Word';
import { Queue } from '../../../utils/queue/createQueue';
import { Stage } from '../../UI/StagesProgress/StagesProgress';
import { getAllLetters } from '../Stages/handlers';
import { LearningCore, LearningEvent } from './Core';
import s from './LearningMain.module.scss';

type Props = {
  stage: Stage;
  setActiveStage: (item: Stage) => void;
  words: Word[];
};

export function LearningMain({ setActiveStage, words, stage }: Props) {
  const stageQueue = useMemo(() => new Queue(words), []);
  const [learningState, setLearningState] = useState({} as LearningEvent);
  function changeLearningState(e: LearningEvent) {
    setLearningState(e);
  }
  const learning = useMemo(
    () => new LearningCore(changeLearningState, stageQueue.getItem(), stage.id),
    []
  );

  const start = () => learning.start();
  const ee = () => learning.gete();

  useEffect(() => {
    start();
  }, []);

  return (
    <div className={s.learning_container}>
      <button onClick={start}>ok</button>
    </div>
  );
}
