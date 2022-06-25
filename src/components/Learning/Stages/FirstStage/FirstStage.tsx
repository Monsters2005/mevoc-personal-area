import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from '../../../UI/Loader/Loader';
import { LearningSvgSelector } from '../../LearningSvgSelector';
import { LearningCore, LearningEvent } from '../../Main/Core';
import { LetterBox } from '../LetterBox/LetterBox';
import { LetterCard } from '../LetterCard/LetterCard';
import { Stage } from '../types';
import s from './FirstStage.module.scss';

export default function FirstStage({ word, currentStage, onComplete }: Stage) {
  const [learningState, setLearningState] = useState({} as LearningEvent);
  function changeLearningState(e: LearningEvent) {
    setLearningState(e);
  }
  const learning = useMemo(
    () => new LearningCore(changeLearningState, word, currentStage.id),
    []
  );

  const start = () => learning.start();

  useEffect(() => {
    start();
  }, []);

  return (
    <div className={s.firststage_wrapper}>
      <div className={s.firststage_container}>
        <div className={s.firststage_wordvisible}>{word?.wordLearning}</div>
        {learningState.letters && learningState.cards ? (
          <>
            <div className={s.firststage_boxes}>
              {learningState.letters?.map(item => (
                <div className={s.firststage_box} key={item.id}>
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
                <div className={s.firststage_complete}>
                  <LearningSvgSelector id="checkmark" />
                </div>
              )}
            </div>

            <div className={s.firststage_letters}>
              {learningState.cards.map(item => (
                <div key={item.id} className={s.firststage_card}>
                  <LetterCard
                    item={item}
                    animation={learningState.activeAnimation}
                    onClick={() => learning.handleCardPick(item)}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
