import React from 'react';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { ActionItem } from '../Sidebar/types';
import { SidebarSvgSelector } from '../SidebarSvgSelector';
import s from './ActionItems.module.scss';
import translations from '../Sidebar/Sidebar.i18n.json';

type Props = {
  item: ActionItem;
  action: () => void;
};

export function ActionsItem({ item: { icon, label, key }, action }: Props) {
  const { t } = useLocalTranslation(translations);

  return (
    <button className={s.bottomblock_button} onClick={action}>
      <span className={s.bottomblock_icon}>
        <SidebarSvgSelector id={icon} />
      </span>
      <p className={s.bottomblock_name}>{t(key)}</p>
    </button>
  );
}
