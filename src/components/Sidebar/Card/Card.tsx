import classNames from 'classnames';
import React from 'react';
import { SidebarSvgSelector } from '../SidebarSvgSelector';
import s from './Card.module.scss';

type Props = {
  item: {
    icon: string;
    name: string;
    path: string;
    id: number;
  };
  onClick: () => void;
  active: string;
};

export function SidebarCard({ item, onClick, active }: Props) {
  return (
    <button
      className={classNames(s.card_container, {
        [s.card_active]: item.path === active,
      })}
      onClick={onClick}
    >
      <span className={s.card_icon}>
        <SidebarSvgSelector id={item.icon} />
      </span>
      <p className={s.card_name}>{item.name}</p>
    </button>
  );
}
