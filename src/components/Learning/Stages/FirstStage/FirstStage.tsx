import React, { useEffect, useMemo, useState } from 'react';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import KeyListener from '../../../../layouts/KeyListener/KeyListener';
import { Button } from '../../../UI/Button/Button';

import { Loader } from '../../../UI/Loader/Loader';
import { LearningSvgSelector } from '../../LearningSvgSelector';
import { LearningCore, LearningEvent } from '../../Main/Core';
import { LetterBox } from '../LetterBox/LetterBox';
import { LetterCard } from '../LetterCard/LetterCard';
import { Stage } from '../types';
import learningTr from '../../Learning.i18n.json';

import s from './FirstStage.module.scss';

export const btnStyles = {
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '27px',
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
  color: '#1F2029',
  padding: '4px 0px 4px 8px',
  marginTop: '20px',
};

export default function FirstStage({ word, currentStage, onComplete }: Stage) {
  const { t } = useLocalTranslation(learningTr);
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
        {learningState.isCompleted && (
          <Button
            type="primary"
            onClick={() => onComplete(learningState.mistakesCount)}
            styles={btnStyles}
          >
            {t('next')}
            <LearningSvgSelector id="arrow-right" />
          </Button>
        )}
      </div>
    </KeyListener>
  );
}
