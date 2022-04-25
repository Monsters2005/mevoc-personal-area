import classNames from 'classnames';
import React, {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { UISvgSelector } from '../../../assets/icons/UI/SvgSelector';
import s from './Dropdown.module.scss';
import { DropdownList } from './DropdownList';
import { Option } from './types';

type DropdownProps = {
  listTitle: string;
  options: Option[];
  defaultSelected: Option;
  allowNoneSelected: boolean;
  styles?: CSSProperties;
  side?: 'left' | 'right';
};

export function Dropdown({
  options,
  defaultSelected,
  listTitle,
  allowNoneSelected,
  styles,
  side = 'left',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultSelected);

  return (
    <div className={s.dropdown_container} style={{ ...styles }}>
      <button
        className={classNames(s.dropdown_active, {
          [s.dropdown_active__open]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={s.dropdown_active__value}>
          {selectedItem.icon}
          <p>{selectedItem.value}</p>
        </div>
        <div
          className={s.dropdown_active__expand}
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
        >
          <UISvgSelector id="arrow-down" />
        </div>
      </button>
      <DropdownList
        isOpen={isOpen}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        options={options}
        listTitle={listTitle}
      />
    </div>
  );
}
