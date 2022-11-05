import React from 'react';
import classNames from 'classnames';
import { SidebarSvgSelector } from '../SidebarSvgSelector';
import s from './Card.module.scss';
import { Page } from '../Sidebar/types';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import translations from '../Sidebar/Sidebar.i18n.json';

type Props = {
  page: Page;
  onClick: () => void;
  active: string | null;
};

export function SidebarCard({ page, onClick, active }: Props) {
  const { t } = useLocalTranslation(translations);

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
      <p className={s.card_name}>{t(page.key)}</p>
    </button>
  );
}
