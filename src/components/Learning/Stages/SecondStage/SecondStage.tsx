/* eslint-disable */
import React, { createRef, RefObject, useEffect, useState } from 'react';
import { LearningSvgSelector } from '../../LearningSvgSelector';
import { LetterBox } from '../LetterBox/LetterBox';
import s from './SecondStage.module.scss';

type Props = {
  wordNative: string;
  wordLearning: string;
  onComplete: () => void;
};

export default function SecondStage({
  wordNative,
  wordLearning,
  onComplete,
}: Props) {
  const areaRef = createRef<HTMLDivElement>();
  const letters = wordLearning.split('').map((letter, id) => ({
    id,
    letter,
  }));
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCell = letters[currentIndex];

  useEffect(() => {
    areaRef?.current?.focus();
  }, []);

  const handleLetterPick = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keyPressed = `Key${currentCell.letter.toUpperCase()}`;

    console.log(keyPressed, e.code, currentIndex);
    if (e.code === keyPressed) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div
      className={s.secondstage_wrapper}
      onKeyDown={handleLetterPick}
      tabIndex={0}
      role="button"
      ref={areaRef}
    >
      <div className={s.secondstage_container}>
        <div className={s.secondstage_wordNative}>{wordNative}</div>
        <div className={s.secondstage_boxes}>
          {letters.map(item => (
            <div className={s.secondstage_box} key={item.id}>
              <LetterBox
                item={item}
                filled={item.id < currentCell.id}
                cellId={currentCell.id}
              />
            </div>
          ))}
        </div>
        <div className={s.secondstage_info}>
          <LearningSvgSelector id="keyboard" />
          <p>Use your keyboard to type the word</p>
        </div>
      </div>
    </div>
  );
}
