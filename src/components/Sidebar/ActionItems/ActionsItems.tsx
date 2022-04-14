import React from 'react';
import { ActionItem } from '../Sidebar/types';
import { ActionsItem } from './ActionItem';
import s from './ActionItems.module.scss';

type Props = {
  items: ActionItem[];
};

export function SidebarActionItems({ items }: Props) {
  return (
    <div className={s.bottomblock_container}>
      {items.map((item: ActionItem) => (
        <ActionsItem item={item} key={item.key} />
      ))}
    </div>
  );
}
