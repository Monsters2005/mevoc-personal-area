import React, { ReactNode } from 'react';
import { Value } from 'sass';
import { TransitionWrapper } from '../../../layouts/Transition/Transition';
import s from './ActionsDropdown.module.scss';

export type DropdownItem = {
  value: string;
  icon?: ReactNode;
  func: () => void;
  key: string;
};

type Props = {
  items: DropdownItem[];
  isOpen: boolean;
};

function ActionsDropdownItem({ value, icon, func }: DropdownItem) {
  return (
    <button type="button" onClick={func} className={s.actions_item}>
      <span>{icon}</span>
      <p>{value}</p>
    </button>
  );
}

export default function ActionsDropdown({ items, isOpen }: Props) {
  return (
    <TransitionWrapper inState={isOpen}>
      <div className={s.actions_container}>
        {items.map(({
          value, icon, func, key,
        }) => (
          <ActionsDropdownItem
            key={key}
            value={value}
            icon={icon}
            func={func}
          />
        ))}
      </div>
    </TransitionWrapper>
  );
}
