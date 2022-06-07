import React, { useState } from 'react';
import s from './ListsProgress.module.scss';
import { ListProgress } from '../ListProgress/ListProgress';
import { List } from '../../../@types/entities/List';

type Props = {
  lists: List[];
  active: List;
  setActive: (id: List) => void;
};

export function UserListsProgress({ lists, active, setActive }: Props) {
  return (
    <div className={s.lists_container}>
      {lists.map((item: List) => (
        <ListProgress
          key={item.id}
          item={item}
          active={active}
          onClick={list => setActive(list)}
        />
      ))}
    </div>
  );
}
