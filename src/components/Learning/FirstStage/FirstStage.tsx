import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { delayAction } from '../../../utils/delayAction';
import { shuffleArray } from '../../../utils/shuffleArray';
import s from './FirstStage.module.scss';
import { LetterBox } from './LetterBox/LetterBox';
import { LetterCard } from './LetterCard/LetterCard';
import { ActiveAnimation, Letter } from './types';

type Props = {
  wordLearning: string;
  wordNative: string;
  onComplete: () => void;
};

export default function FirstStage({
  wordLearning,
  wordNative,
  onComplete,
}: Props) {
  const letters = wordLearning.split('').map((letter, id) => ({
    id,
    letter,
  }));
  const cards = useMemo(() => shuffleArray([...letters]), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [activeAnimation, setActiveAnimation] = useState<ActiveAnimation | null>(null);
  const currentCell = letters[currentIndex];

  const handleAnimation = (state: 'incorrect' | 'correct', id: number) => {
    setActiveAnimation({ state, letterId: id });
  };

  const handleLetterPick = (letterPicked: Letter) => {
    // const insertLetter = () => {};
    if (letterPicked.letter === currentCell.letter) {
      // insertLetter();
      const cardIndex = cards.indexOf(
        cards.find(el => el.id === currentCell.id) || letters[currentIndex]
      );
      cards.splice(cardIndex, 1);
      setCurrentIndex(currentIndex + 1);
      console.log(letterPicked.id, currentCell.id);
      console.log('cards', cards);
      handleAnimation('correct', letterPicked.id);
      //! animation is broken. changes the visibility of two same elements
    } else {
      setMistakesCount(mistakesCount + 1);
      handleAnimation('incorrect', letterPicked.id);
    }
  };

  return (
    <div className={s.firststage_container}>
      <div className={s.firststage_wordNative}>{wordNative}</div>
      <div className={s.firststage_boxes}>
        {letters.map(item => (
          <div className={s.firststage_box} key={item.id}>
            <LetterBox
              item={item}
              filled={item.id < currentCell.id}
              cellId={currentCell.id}
            />
          </div>
        ))}
      </div>
      <div className={s.firststage_letters}>
        {cards.map(item => (
          <div key={item.id} className={s.firststage_card}>
            <LetterCard
              item={item}
              removed={item.id < currentCell.id}
              animation={activeAnimation}
              onClick={() => handleLetterPick(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
