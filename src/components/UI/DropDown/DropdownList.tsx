import React, { CSSProperties } from 'react';
import s from './Dropdown.module.scss';
import { DropdownItem } from './DropdownItem';
import { Option } from './types';
import { TransitionWrapper } from '../../../layouts/Transition/Transition';

type Props = {
  isOpen: boolean;
  options: Option[];
  listTitle?: string;
  selectedItem: Option | null;
  setSelectedItem: (item: Option | null) => void;
  allowNoneSelected: boolean;
};

export function DropdownList({
  isOpen,
  listTitle,
  options,
  selectedItem,
  setSelectedItem,
  allowNoneSelected,
}: Props) {
  const transitionStyles = {
    entering: { opacity: 0.5, zIndex: 1 },
    entered: { opacity: 1, zIndex: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0, zIndex: -100 },
  };

  function selectHandler(item: Option | null) {
    if (allowNoneSelected) {
      if (item?.id === selectedItem?.id) {
        setSelectedItem(null);
      } else {
        setSelectedItem(item);
      }
    } else {
      setSelectedItem(item);
    }
  }

  return (
    <TransitionWrapper inState={!isOpen} transitionStyles={transitionStyles}>
      <div className={s.dropdown_list}>
        <h3 className={s.dropdown_title}>{listTitle}</h3>
        <div className={s.dropdown_options}>
          {options.map(item => (
            <DropdownItem
              item={item}
              key={item.id}
              selectedItem={selectedItem}
              onClick={option => selectHandler(option)}
            />
          ))}
        </div>
      </div>
    </TransitionWrapper>
  );
}
