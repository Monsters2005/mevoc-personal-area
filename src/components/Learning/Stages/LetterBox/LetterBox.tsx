import React from 'react';
import classNames from 'classnames';
import s from './LetterBox.module.scss';
import anim from '../Animations.module.scss';
import { Letter } from '../types';

type Props = {
  item: Letter;
  filled: boolean;
  completed: boolean;
  cellId: number;
};

export function LetterBox({
  item, filled, cellId, completed,
}: Props) {
  return (
    <div className={classNames(s.letterbox_container, {})}>
      {filled && (
        <div
          className={classNames(s.letterbox_container_filled, {
            [anim.letterbox_animate_complete]: completed,
            [s.letterbox_container_complete]: completed,
            [anim.letterbox_animate_appear]: filled,
          })}
        >
          <p
            className={classNames(s.stage_letter, {
              [s.stage_letter_filled]: filled,
            })}
          >
            {item.letter}
          </p>
        </div>
      )}
    </div>
  );
}
