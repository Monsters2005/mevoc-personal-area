import React, { ReactNode } from 'react';
import { Value } from 'sass';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { TransitionWrapper } from '../../../layouts/Transition/Transition';
import s from './ActionsDropdown.module.scss';
import translations from '../../Sidebar/Sidebar/Sidebar.i18n.json';

export type DropdownItem = {
  icon?: ReactNode;
  value: string;
  func: () => void;
  path: string | null;
};

export type ActionItem = {
  icon?: ReactNode;
  key: string;
  func: () => void;
  path: string | null;
};

type Props = {
  items: ActionItem[];
  isOpen: boolean;
};

function ActionsDropdownItem({
  icon, func, value, path,
}: DropdownItem) {
  const { t } = useLocalTranslation(translations);

  return (
    <button type="button" onClick={func} className={s.actions_item}>
      <span>{icon}</span>
      <p>{t(value)}</p>
    </button>
  );
}

export default function ActionsDropdown({ items, isOpen }: Props) {
  return (
    <TransitionWrapper inState={isOpen}>
      <div className={s.actions_container}>
        {items.map(({
          icon, func, key, path,
        }) => (
          <ActionsDropdownItem
            path={path}
            icon={icon}
            func={func}
            value={key}
            key={key}
          />
        ))}
      </div>
    </TransitionWrapper>
  );
}
