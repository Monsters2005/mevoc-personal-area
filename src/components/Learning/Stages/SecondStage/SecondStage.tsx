import React, { useEffect, useMemo, useState } from 'react';
import { LearningSvgSelector } from '../../LearningSvgSelector';
import { LetterBox } from '../LetterBox/LetterBox';
import { LetterCard } from '../LetterCard/LetterCard';
import { Stage } from '../types';
import s from './SecondStage.module.scss';
import { Loader } from '../../../UI/Loader/Loader';
import { LearningCore, LearningEvent } from '../../Main/Core';
import { btnStyles } from '../FirstStage/FirstStage';
import { Button } from '../../../UI/Button/Button';
import KeyListener from '../../../../layouts/KeyListener/KeyListener';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import learningTr from '../../Learning.i18n.json';

export default function SecondStage({
  word,
  currentStage,
  onComplete,
}: Stage) {
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
      <div className={s.secondstage_wrapper}>
        <div className={s.secondstage_container}>
          <div className={s.secondstage_wordNative}>{word?.wordNative}</div>
          {learningState.letters && learningState.cards ? (
            <>
              <div className={s.secondstage_boxes}>
                {learningState.letters?.map(item => (
                  <div className={s.secondstage_box} key={item.id}>
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
                  <div className={s.secondstage_complete}>
                    <LearningSvgSelector id="checkmark" />
                  </div>
                )}
              </div>

              <div className={s.secondstage_letters}>
                {learningState.cards.map(item => (
                  <div key={item.id} className={s.secondstage_card}>
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
