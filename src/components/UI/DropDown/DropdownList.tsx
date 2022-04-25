import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import s from './Dropdown.module.scss';
import { DropdownItem } from './DropdownItem';
import { Option } from './types';
import { TransitionWrapper } from '../../../layouts/Transition/Transition';

type Props = {
  isOpen: boolean;
  options: Option[];
  listTitle: string;
  selectedItem: Option;
  setSelectedItem: (item: Option) => void;
  styles?: CSSProperties;
};

export function DropdownList(props: Props) {
  const {
    isOpen, listTitle, options, selectedItem, setSelectedItem, styles,
  } = props;

  const transitionStyles = {
    entering: { opacity: 0.5, zIndex: 1 },
    entered: { opacity: 1, zIndex: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0, zIndex: -100 },
  };

  function selectHandler(item: Option) {
    console.log(item);
    if (item) setSelectedItem(item);
  }

  return (
    <TransitionWrapper inState={!isOpen} transitionStyles={transitionStyles}>
      <div style={styles} className={classNames(s.dropdown_list)}>
        <h3 className={s.dropdown_title}>{listTitle}</h3>
        <div className={s.dropdown_options}>
          {options.map(item => (
            <DropdownItem
              item={item}
              key={item.key}
              selectedItem={selectedItem}
              onClick={option => selectHandler(option)}
            />
          ))}
        </div>
      </div>
    </TransitionWrapper>
  );
}
