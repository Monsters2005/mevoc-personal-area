import React, {
  createRef, useEffect, useMemo, useRef, useState,
} from 'react';
import KeyListener from '../../../../layouts/KeyListener/KeyListener';
import { TransitionWrapper } from '../../../../layouts/Transition/Transition';
import { Button } from '../../../UI/Button/Button';
import { Input } from '../../../UI/Input/Input';
import { LearningSvgSelector } from '../../LearningSvgSelector';
import { LearningCore, LearningEvent } from '../../Main/Core';
import { Stage } from '../types';
import s from './FourthStage.module.scss';
import { useCountdown } from './useCountdown';

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

  const [colorAlarm, setColorAlarm] = useState(false);
  const [value, setValue] = useState('');
  const { minutes, seconds, setSeconds } = useCountdown(0, 15);
  const inputRef = createRef<HTMLInputElement>();

  const handleCompletion = () => {
    learning.handleInput(value);
    learning.handleCompletion(onComplete);
  };

  useEffect(() => {
    start();
    setSeconds(15);
    inputRef?.current?.focus();
    setValue('');
  }, [word]);

  useEffect(() => {
    function checkExpiration() {
      if (seconds === 0) {
        learning.handleTestFail();
        handleCompletion();
      }
      if (seconds === 10) {
        setColorAlarm(true);
      }
    }
    checkExpiration();
  }, [minutes, seconds]);

  return (
    <KeyListener
      state={learningState.isCompleted}
      listeners={[
        {
          key: 'Enter',
          function: () => handleCompletion(),
        },
      ]}
    >
      <div className={s.fourthstage_container}>
        <div className={s.fourthstage_wordvisible}>{word?.wordNative}</div>
        <div
          className={s.fourthstage_timer}
          style={colorAlarm ? { color: '#EA4E4E' } : {}}
        >
          {minutes}
          :
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className={s.fourthstage_inputcontainer}>
          <input
            className={s.fourthstage_input}
            placeholder="Type your answer here"
            ref={inputRef}
            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
          />
          <TransitionWrapper inState={value !== ''}>
            <Button type="primary" onClick={() => handleCompletion()}>
              <LearningSvgSelector id="arrow-right" />
            </Button>
          </TransitionWrapper>
        </div>
      </div>
    </KeyListener>
  );
}
