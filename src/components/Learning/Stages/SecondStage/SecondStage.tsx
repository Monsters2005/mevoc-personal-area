import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { GlobalSvgSelector } from '../../../../shared/GlobalSvgSelector';
import { delayAction } from '../../../../utils/common/delayAction';
import { shuffleArray } from '../../../../utils/common/shuffleArray';
import { LearningSvgSelector } from '../../LearningSvgSelector';
import { LetterBox } from '../LetterBox/LetterBox';
import { LetterCard } from '../LetterCard/LetterCard';
import { ActiveAnimation, Letter, Stage } from '../types';
import s from './SecondStage.module.scss';
import { getAllLetters } from '../handlers';

export default function SecondStage({
  wordLearning,
  wordNative,
  onComplete,
}: Stage) {
  const letters = getAllLetters(wordLearning);
  const cards = useMemo(() => shuffleArray([...letters]), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState<ActiveAnimation | null>(null);
  const currentCell = letters[currentIndex] || undefined;

  const handleAnimation = (state: 'incorrect' | 'correct', id: number) => {
    setActiveAnimation({ state, letterId: id });
  };

  const handleCompletion = () => {
    onComplete(mistakesCount);
    setCompleted(true);
  };

  const handlePickSuccess = (letterPicked: Letter) => {
    const cardIndex = cards.indexOf(
      cards.find(el => el.id === currentCell.id) || letters[currentIndex]
    );
    const idCount = letters.length - 1;
    delayAction(() => {
      cards.splice(cardIndex, 1);
      setCurrentIndex(currentIndex + 1);
    }, 200);

    handleAnimation('correct', currentCell.id);
    if (idCount === letterPicked.id) {
      delayAction(handleCompletion, 400);
    }
  };

  const handleLetterPick = (letterPicked: Letter) => {
    if (completed) return;
    const isCorrect = letterPicked.letter === currentCell.letter;
    if (isCorrect) {
      handlePickSuccess(letterPicked);
    } else {
      setMistakesCount(mistakesCount + 1);
      handleAnimation('incorrect', letterPicked.id);
    }
  };

  return (
    <div className={s.secondstage_wrapper}>
      <div className={s.secondstage_container}>
        <div className={s.secondstage_wordNative}>{wordNative}</div>
        <div className={s.secondstage_boxes}>
          {letters.map(item => (
            <div className={s.secondstage_box} key={item.id}>
              <LetterBox
                item={item}
                filled={currentCell ? item?.id < currentCell?.id : true}
                cellId={currentCell?.id}
                completed={completed}
              />
            </div>
          ))}
          {completed && (
            <div className={s.secondstage_complete}>
              <LearningSvgSelector id="checkmark" />
            </div>
          )}
        </div>

        <div className={s.secondstage_letters}>
          {cards.map(item => (
            <div key={item.id} className={s.secondstage_card}>
              <LetterCard
                item={item}
                animation={activeAnimation}
                onClick={() => handleLetterPick(item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
