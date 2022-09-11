import React, { CSSProperties } from 'react';
import s from './Dropdown.module.scss';
import { DropdownItem } from './DropdownItem';
import { Option } from './types';
import { TransitionWrapper } from '../../../layouts/Transition/Transition';

type Props = {
  isOpen: boolean;
  options: Option[] | undefined;
  listTitle?: string;
  selectedItem: Option | undefined;
  setSelectedItem: (item: Option | undefined) => void;
  allowNoneSelected: boolean;
  listStyles?: CSSProperties;
};

export function DropdownList({
  isOpen,
  listTitle,
  options,
  selectedItem,
  setSelectedItem,
  allowNoneSelected,
  listStyles,
}: Props) {
  const transitionStyles = {
    entering: { opacity: 1, zIndex: 100 },
    entered: { opacity: 1, zIndex: 10 },
    exiting: { opacity: 0, zIndex: 10, pointerEvents: 'none' },
    exited: { opacity: 0, zIndex: -10, pointerEvents: 'none' },
  };

  function selectHandler(item: Option | undefined) {
    if (allowNoneSelected) {
      if (item?.id === selectedItem?.id) {
        setSelectedItem(undefined);
      } else {
        setSelectedItem(item);
      }
    } else {
      setSelectedItem(item);
    }
  }

  return (
    <TransitionWrapper inState={isOpen} transitionStyles={transitionStyles}>
      <div className={s.dropdown_list} style={listStyles}>
        <h3 className={s.dropdown_title}>{listTitle}</h3>
        <div className={s.dropdown_options}>
          {options?.map(item => (
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
