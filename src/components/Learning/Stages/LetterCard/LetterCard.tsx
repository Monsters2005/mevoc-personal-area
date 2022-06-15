import React, { useState } from 'react';
import classNames from 'classnames';
import s from '../FirstStage/FirstStage.module.scss';
import anim from '../Animations.module.scss';
import { ActiveAnimation, Letter } from '../types';

type Props = {
  item: Letter;
  onClick: () => void;
  removed: boolean;
  animation: ActiveAnimation | null;
};

export function LetterCard({
  item, onClick, removed, animation,
}: Props) {
  console.log(animation, item);

  return (
    <button
      className={classNames(s.firststage_cardcontainer, {
        [s.firststage_cardcontainer_removed]: removed,
        [anim[`firststage_animate_${animation?.state}`]]:
          animation?.letterId === item.id,
      })}
      onClick={onClick}
    >
      <p className={s.firststage_cardletter}>{item.letter}</p>
    </button>
  );
}
