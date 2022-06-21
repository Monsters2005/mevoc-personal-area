import React from 'react';
import classNames from 'classnames';
import s from '../FirstStage/FirstStage.module.scss';
import { Letter } from '../types';

type Props = {
  item: Letter;
  filled: boolean;
  cellId: number;
};

export function LetterBox({ item, filled, cellId }: Props) {
  return (
    <div
      className={classNames(s.firststage_lettercontainer, {
        [s.firststage_lettercontainer_filled]: filled,
        [s.firststage_lettercontainer_active]: item.id === cellId,
      })}
    >
      <p
        className={classNames(s.firststage_letter, {
          [s.firststage_letter_filled]: filled,
        })}
      >
        {filled && item.letter}
      </p>
    </div>
  );
}
