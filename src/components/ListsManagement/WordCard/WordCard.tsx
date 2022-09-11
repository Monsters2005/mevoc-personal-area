import classNames from 'classnames';
import React, { useState } from 'react';
import { makeSuspensionString } from '../../../utils/common/makeSuspensionString';
import { Button } from '../../UI/Button/Button';
import { ListsManagementSvgSelector } from '../ListsManagementSvgSelector';
import s from './WordCard.module.scss';

type Props = {
  wordLearning: string;
  wordNative: string;
  onEditWord: () => void;
};

export function DashboardWordCard({
  wordLearning,
  wordNative,
  onEditWord,
}: Props) {
  const [selected, setSelected] = useState(false);
  return (
    <div
      onClick={() => setSelected(!selected)}
      onKeyPress={() => setSelected(!selected)}
      role="presentation"
      className={classNames(s.wordcard_container, {
        [s.wordcard_active]: selected,
      })}
    >
      <div className={s.wordcard_content}>
        <h3>{makeSuspensionString(wordLearning, 20)}</h3>
        <p>{makeSuspensionString(wordNative, 20)}</p>
      </div>
      <Button type="small" onClick={onEditWord}>
        <ListsManagementSvgSelector id="edit" />
      </Button>
    </div>
  );
}
