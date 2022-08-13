import React from 'react';
import { ActionItem } from '../Sidebar/types';
import { ActionsItem } from './ActionItem';
import s from './ActionItems.module.scss';

type Props = {
  items: ActionItem[];
  onGoToHelp: () => void;
  onSignOut: () => void;
};

export function SidebarActionItems({ items, onGoToHelp, onSignOut }: Props) {
  return (
    <div className={s.bottomblock_container}>
      <ActionsItem item={items[0]} action={onSignOut} />
      <ActionsItem item={items[1]} action={onGoToHelp} />
    </div>
  );
}
