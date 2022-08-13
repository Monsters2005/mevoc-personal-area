import React from 'react';
import { ActionItem } from '../Sidebar/types';
import { SidebarSvgSelector } from '../SidebarSvgSelector';
import s from './ActionItems.module.scss';

type Props = {
  item: ActionItem;
  action: () => void;
};

export function ActionsItem({ item: { icon, label }, action }: Props) {
  return (
    <button className={s.bottomblock_button} onClick={action}>
      <span className={s.bottomblock_icon}>
        <SidebarSvgSelector id={icon} />
      </span>
      <p className={s.bottomblock_name}>{label}</p>
    </button>
  );
}
