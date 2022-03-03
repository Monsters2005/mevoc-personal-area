import classNames from 'classnames';
import React, { useState } from 'react';
import { checkLength } from '../../../utils/checkLength';
import { Button } from '../../UI/Button/Button';
import { ListsManagementSvgSelector } from '../ListsManagementSvgSelector';
import s from './WordCard.module.scss';

type Props = {
  wordLearning: string;
  wordNative: string;
  onEdit: () => void;
};

export function DashboardWordCard({
  wordLearning,
  wordNative,
  onEdit,
}: Props) {
  const [selected, setSelected] = useState(false);

  return (
    <button
      onClick={() => setSelected(!selected)}
      className={classNames(s.wordcard_container, {
        [s.wordcard_active]: selected,
      })}
    >
      <div className={s.wordcard_content}>
        <h3>{checkLength(wordLearning, 20)}</h3>
        <p>{checkLength(wordNative, 20)}</p>
      </div>
      <Button type="small" onClick={onEdit}>
        <ListsManagementSvgSelector id="edit" />
      </Button>
    </button>
  );
}
