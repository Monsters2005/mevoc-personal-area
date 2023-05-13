import classNames from 'classnames';
import React, {
  CSSProperties, SetStateAction, useRef, useState,
} from 'react';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { useOutsideCheck } from '../../../hooks/useOutsideCheck';
import { TransitionWrapper } from '../../../layouts/Transition/Transition';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import { makeSuspensionString } from '../../../utils/common/makeSuspensionString';
import { UISvgSelector } from '../UISvgSelector';
import s from './Dropdown.module.scss';
import { DropdownList } from './DropdownList';
import { Option } from './types';
import common from '../Common.i18n.json';

type DropdownProps = {
  listTitle?: string;
  label?: string;
  options: Option[] | undefined;
  selectedItem: Option | undefined;
  setSelectedItem: (item: Option | undefined) => void;
  allowNoneSelected: boolean;
  styles?: CSSProperties;
  listStyles?: CSSProperties;
  side?: 'left' | 'right';
  isError?: boolean;
  error?: string;
  searchBar?: boolean;
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
  searchBar,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<Option[] | undefined>(options);
  const { t } = useLocalTranslation(common);
  const transitionStyles = {
    entering: { opacity: 1, zIndex: 100 },
    entered: { opacity: 1, zIndex: 10 },
    exiting: { opacity: 0, zIndex: 10, pointerEvents: 'none' },
    exited: { opacity: 0, zIndex: -10, pointerEvents: 'none' },
  };

  const dropdownRef = useRef(null);

  useOutsideCheck(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <>
      {label && (
        <label className={s.dropdown_label} htmlFor="select">
          {label}
        </label>
      )}
      <div
        ref={dropdownRef}
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
                <p>{makeSuspensionString(selectedItem.value, 13)}</p>
              </>
            ) : (
              <p>{t('noneSelected')}</p>
            )}
          </div>
          <div
            className={s.dropdown_active__expand}
            style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
          >
            <UISvgSelector id="arrow-down" />
          </div>
        </button>
        <TransitionWrapper
          inState={isOpen}
          transitionStyles={transitionStyles}
        >
          <DropdownList
            setIsOpen={(bool: SetStateAction<boolean>) => setIsOpen(bool)}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            options={searchBar ? result : options}
            setResult={(elems: Option[]) => setResult(elems)}
            listTitle={listTitle}
            allowNoneSelected={allowNoneSelected}
            searchBar={searchBar}
            listStyles={listStyles}
          />
        </TransitionWrapper>

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
