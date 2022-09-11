import React, { useState } from 'react';
import classNames from 'classnames';
import s from './ListProgress.module.scss';
import { pluralizeString } from '../../../utils/components/pluralizeString';
import { List } from '../../../@types/entities/List';
import { CircularProgress } from '../../UI/CircularProgress/CircularProgress';

type Props = {
  item: List;
  active: List;
  onClick: (active: List) => void;
};

export function ListProgress({ item, active, onClick }: Props) {
  function selectHandler(list: List) {
    return () => {
      onClick(list);
    };
  }

  return (
    <button
      className={classNames(s.list_container, {
        [s.list_active]: active.id === item.id,
      })}
      onClick={selectHandler(item)}
    >
      <div className={s.list_progress}>
        <CircularProgress
          progressValue={item?.progress || 0}
          width={60}
          height={60}
          percentStyles={{ fontSize: '14px' }}
          circleStroke={3}
          styles={{ minWidth: '60px', minHeight: '60px' }}
          bgColor="#9C9BA0"
        />
      </div>
      <div className={s.list_content}>
        <h4>{item.name}</h4>
        <p>{pluralizeString(item.words.length)}</p>
      </div>
    </button>
  );
}
