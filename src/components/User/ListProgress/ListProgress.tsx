import React, { useState } from 'react';
import classNames from 'classnames';
import s from './ListProgress.module.scss';
import { pluralizeString } from '../../../utils/pluralizeString';
import { List } from '../../../@types/entities/List';
import { CircularProgress } from '../../UI/CircularProgress/CircularProgress';

type Props = {
  item: List;
  active: number;
  onClick: (active: number) => void;
};

export function ListProgress({ item, active, onClick }: Props) {
  function selectHandler(list: List) {
    return () => {
      onClick(list.id);
    };
  }

  return (
    <button
      className={classNames(s.list_container, {
        [s.list_active]: active === item.id,
      })}
      onClick={selectHandler(item)}
    >
      <div className={s.list_progress}>
        <CircularProgress
          progressValue={item.progress}
          width={60}
          height={60}
          percentStyles={{ fontSize: '14px' }}
          circleStroke={3}
          styles={{ minWidth: '60px', minHeight: '60px' }}
        />
      </div>
      <div className={s.list_content}>
        <h4>{item.name}</h4>
        <p>{pluralizeString(item.words.length)}</p>
      </div>
    </button>
  );
}
