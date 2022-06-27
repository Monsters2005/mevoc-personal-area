import React, { useEffect, useMemo, useState } from 'react';
import KeyListener from '../../../../layouts/KeyListener/KeyListener';
import { LearningCore, LearningEvent } from '../../Main/Core';
import { Stage } from '../types';
import s from './FourthStage.module.scss';

export default function FourthStage({
  word,
  currentStage,
  onComplete,
}: Stage) {
  const [learningState, setLearningState] = useState({} as LearningEvent);
  function changeLearningState(e: LearningEvent) {
    setLearningState(e);
  }
  const learning = useMemo(
    () => new LearningCore(changeLearningState, word, currentStage.id),
    [word]
  );

  const start = () => learning.start();

  useEffect(() => {
    start();
  }, [word]);

  return (
    <KeyListener
      state={learningState.isCompleted}
      listeners={[
        {
          key: 'Enter',
          function: () => learning.handleCompletion(onComplete),
        },
      ]}
    >
      <div className={s.fourthstage_container}>
        <div className={s.firststage_wordvisible}>{word?.wordLearning}</div>
      </div>
    </KeyListener>
  );
}
