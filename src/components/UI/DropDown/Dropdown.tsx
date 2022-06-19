import classNames from 'classnames';
import React, { CSSProperties, SetStateAction, useState } from 'react';
import { UISvgSelector } from '../../../assets/icons/UI/SvgSelector';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import s from './Dropdown.module.scss';
import { DropdownList } from './DropdownList';
import { Option } from './types';

type DropdownProps = {
  listTitle?: string;
  label?: string;
  options: Option[];
  selectedItem: Option | null;
  setSelectedItem: (item: Option | null) => void;
  allowNoneSelected: boolean;
  styles?: CSSProperties;
  listStyles?: CSSProperties;
  side?: 'left' | 'right';
  isError?: boolean;
  error?: string;
};

export function Dropdown({
  options,
  selectedItem,
  listTitle,
  label,
  allowNoneSelected,
  setSelectedItem,
  styles,
  side = 'left',
  isError,
  error,
  listStyles,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {label && (
        <label className={s.dropdown_label} htmlFor="select">
          {label}
        </label>
      )}
      <div
        className={classNames(s.dropdown_container, {
          [s.dropdown_container_right]: side === 'right',
        })}
      >
        <button
          className={classNames(s.dropdown_active, {
            [s.dropdown_active__open]: isOpen,
          })}
          onClick={() => setIsOpen(!isOpen)}
          style={{ ...styles }}
        >
          <div className={s.dropdown_active__value}>
            {selectedItem ? (
              <>
                {selectedItem.icon}
                <p>{selectedItem.value}</p>
              </>
            ) : (
              <p>None selected</p>
            )}
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
          allowNoneSelected={allowNoneSelected}
          listStyles={listStyles}
        />
        {isError && (
          <div className={s.dropdown_error}>
            <GlobalSvgSelector id="error" />
            <p>{error ?? ''}</p>
          </div>
        )}
      </div>
    </>
  );
}
