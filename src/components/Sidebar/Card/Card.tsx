import React from 'react';
import classNames from 'classnames';
import { SidebarSvgSelector } from '../SidebarSvgSelector';
import s from './Card.module.scss';
import { Page } from '../Sidebar/types';

type Props = {
  page: Page;
  onClick: () => void;
  active: string | number | symbol;
};

export function SidebarCard({ page, onClick, active }: Props) {
  return (
    <button
      className={classNames(s.card_container, {
        [s.card_active]: page.key === active,
      })}
      onClick={onClick}
    >
      <span className={s.card_icon}>
        <SidebarSvgSelector id={page.icon} />
      </span>
      <p className={s.card_name}>{page.name}</p>
    </button>
  );
}
