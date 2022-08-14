import React, {
  createRef, useEffect, useMemo, useState,
} from 'react';
import KeyListener from '../../../../layouts/KeyListener/KeyListener';
import { Button } from '../../../UI/Button/Button';
import { Loader } from '../../../UI/Loader/Loader';
import { LearningSvgSelector } from '../../LearningSvgSelector';
import { LearningCore, LearningEvent } from '../../Main/Core';
import { btnStyles } from '../FirstStage/FirstStage';
import { LetterBox } from '../LetterBox/LetterBox';
import { Stage } from '../types';
import s from './ThirdStage.module.scss';

export default function ThirdStage({ word, currentStage, onComplete }: Stage) {
  const areaRef = createRef<HTMLDivElement>();

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
    areaRef?.current?.focus();
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
      <div
        className={s.thirdstage_wrapper}
        onKeyDown={e => learning.handleKeyPick(e)}
        tabIndex={0}
        role="button"
        ref={areaRef}
      >
        <div className={s.thirdstage_container}>
          <div className={s.thirdstage_wordNative}>{word?.wordNative}</div>
          {learningState.letters ? (
            <div className={s.thirdstage_boxes}>
              {learningState.letters?.map(item => (
                <div className={s.thirdstage_box} key={item.id}>
                  <LetterBox
                    item={item}
                    filled={
                      learningState.currentCell
                        ? item?.id < learningState.currentCell?.id
                        : true
                    }
                    cellId={learningState.currentCell?.id || null}
                    completed={learningState.isCompleted}
                  />
                </div>
              ))}
              {learningState.isCompleted && (
                <div className={s.thirdstage_complete}>
                  <LearningSvgSelector id="checkmark" />
                </div>
              )}
            </div>
          ) : (
            <Loader />
          )}
          <div className={s.thirdstage_info}>
            <LearningSvgSelector id="keyboard" />
            <p>Use your keyboard to type the word</p>
          </div>
        </div>
        {learningState.isCompleted && (
          <Button
            type="primary"
            onClick={() => onComplete(learningState.mistakesCount)}
            styles={btnStyles}
          >
            Next
            <LearningSvgSelector id="arrow-right" />
          </Button>
        )}
      </div>
    </KeyListener>
  );
}
