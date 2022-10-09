import React, { CSSProperties, SetStateAction, useRef } from 'react';
import s from './Dropdown.module.scss';
import { DropdownItem } from './DropdownItem';
import { Option } from './types';
import { TransitionWrapper } from '../../../layouts/Transition/Transition';
import { useOutsideCheck } from '../../../hooks/useOutsideCheck';
import SearchInput from '../SearchInput/SearchInput';

type Props = {
  options: Option[] | undefined;
  listTitle?: string;
  selectedItem: Option | undefined;
  setSelectedItem: (item: Option | undefined) => void;
  allowNoneSelected: boolean;
  listStyles?: CSSProperties;
  setIsOpen: (bool: SetStateAction<boolean>) => void;
  setResult: (elems: Option[]) => void;
  searchBar?: boolean;
};

export function DropdownList({
  listTitle,
  options,
  selectedItem,
  setSelectedItem,
  allowNoneSelected,
  listStyles,
  setIsOpen,
  setResult,
  searchBar,
}: Props) {
  function selectHandler(item: Option | undefined) {
    if (allowNoneSelected) {
      if (item?.id === selectedItem?.id) {
        setSelectedItem(undefined);
        // setIsOpen(false);
      } else {
        setSelectedItem(item);
        // setIsOpen(false);
      }
    } else {
      setSelectedItem(item);
      // setIsOpen(false);
    }
  }

  const dropdownRef = useRef(null);

  useOutsideCheck(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div ref={dropdownRef} className={s.dropdown_list} style={listStyles}>
      <h3 className={s.dropdown_title}>{listTitle}</h3>
      {options && searchBar && (
        <SearchInput
          items={options.map(el => el.value)}
          setItems={items => setResult(options.filter(el => items.includes(el.value)))}
          size="small"
          placeholder=""
        />
      )}
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
  );
}
