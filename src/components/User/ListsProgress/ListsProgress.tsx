import React, { useState } from 'react';
import s from './ListsProgress.module.scss';
import { ListProgress } from '../ListProgress/ListProgress';
import { List } from '../../../@types/entities/List';

type Props = {
  lists: List[];
};

export function UserListsProgress({ lists }: Props) {
  const [active, setActive] = useState(lists[0].id);

  return (
    <div className={s.lists_container}>
      {lists.map((item: List) => (
        <ListProgress
          key={item.id}
          item={item}
          active={active}
          onClick={newActive => setActive(newActive)}
        />
      ))}
    </div>
  );
}
