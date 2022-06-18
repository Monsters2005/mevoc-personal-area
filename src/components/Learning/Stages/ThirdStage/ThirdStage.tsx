import React, {
  createRef, RefObject, useEffect, useState,
} from 'react';
import { delayAction } from '../../../../utils/common/delayAction';
import { LearningSvgSelector } from '../../LearningSvgSelector';
import { getAllLetters } from '../handlers';
import { LetterBox } from '../LetterBox/LetterBox';
import { Stage } from '../types';
import s from './ThirdStage.module.scss';

export default function ThirdStage({
  wordNative,
  wordLearning,
  onComplete,
}: Stage) {
  const areaRef = createRef<HTMLDivElement>();
  const letters = getAllLetters(wordLearning);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCell = letters[currentIndex] || undefined;

  useEffect(() => {
    areaRef?.current?.focus();
  }, []);

  const handleCompletion = () => {
    onComplete(mistakesCount);
    setCompleted(true);
  };

  const handleLetterPick = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (completed) return;
    const keyPressed = `Key${currentCell.letter.toUpperCase()}`;
    const idCount = letters.length - 1;

    if (e.code === keyPressed) {
      setCurrentIndex(currentIndex + 1);
      if (idCount === currentCell.id) {
        delayAction(handleCompletion, 400);
      }
    } else {
      setMistakesCount(mistakesCount + 1);
    }
  };

  return (
    <div
      className={s.thirdstage_wrapper}
      onKeyDown={handleLetterPick}
      tabIndex={0}
      role="button"
      ref={areaRef}
    >
      <div className={s.thirdstage_container}>
        <div className={s.thirdstage_wordNative}>{wordNative}</div>
        <div className={s.thirdstage_boxes}>
          {letters.map(item => (
            <div className={s.thirdstage_box} key={item.id}>
              <LetterBox
                item={item}
                filled={currentCell ? item?.id < currentCell?.id : true}
                cellId={currentCell?.id}
                completed={completed}
              />
            </div>
          ))}
          {completed && (
            <div className={s.thirdstage_complete}>
              <LearningSvgSelector id="checkmark" />
            </div>
          )}
        </div>
        <div className={s.thirdstage_info}>
          <LearningSvgSelector id="keyboard" />
          <p>Use your keyboard to type the word</p>
        </div>
      </div>
    </div>
  );
}
