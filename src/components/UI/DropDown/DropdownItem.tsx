import React from 'react';
import classNames from 'classnames';
import s from './Dropdown.module.scss';
import { Option } from './types';

type Props = {
  item: Option;
  selectedItem: Option;
  onClick: (option: Option) => void;
};

export function DropdownItem({ item, selectedItem, onClick }: Props) {
  return (
    <div
      className={classNames(s.dropdown_item, {
        [s.dropdown_item__selected]: item.key === selectedItem.key,
      })}
      onClick={() => onClick(item)}
      role="presentation"
    >
      {item.icon}
      <div className={s.dropdown_item__info}>
        <h4>{item.value}</h4>
        <p>{item.details}</p>
      </div>
      <div className={s.dropdown_item__addition}>{item.addition}</div>
    </div>
  );
}
