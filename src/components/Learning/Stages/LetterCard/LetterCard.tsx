import React, { useState } from 'react';
import classNames from 'classnames';
import anim from '../Animations.module.scss';
import s from './LetterCard.module.scss';
import { ActiveAnimation, Letter } from '../types';

type Props = {
  item: Letter;
  onClick: () => void;
  animation: ActiveAnimation | null;
};

export function LetterCard({ item, onClick, animation }: Props) {
  return (
    <button
      className={classNames(s.lettercard_container, {
        [anim[`lettercard_animate_${animation?.state}`]]:
          animation?.letterId === item.id,
      })}
      onClick={onClick}
    >
      <p className={s.lettercard_letter}>{item.letter}</p>
    </button>
  );
}
