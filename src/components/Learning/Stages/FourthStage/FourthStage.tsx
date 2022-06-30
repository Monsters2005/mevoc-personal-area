import React, { useEffect, useMemo, useState } from 'react';
import KeyListener from '../../../../layouts/KeyListener/KeyListener';
import { Input } from '../../../UI/Input/Input';
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

  const [counter, setCounter] = useState(learningState.timer);

  useEffect(() => {
    if (counter === 0) learning.handleCompletion(onComplete);
    const timer = learningState.timer > 0
      && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer as any);
  }, [counter, word]);

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
        <div className={s.fourthstage_wordvisible}>{word?.wordNative}</div>
        <div className={s.fourthstage_timer}>{counter}</div>
        <input
          className={s.fourthstage_input}
          placeholder="Type your answer here"
        />
      </div>
    </KeyListener>
  );
}
