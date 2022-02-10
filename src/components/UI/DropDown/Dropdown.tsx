import classNames from 'classnames';
import React, {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { UISvgSelector } from '../../../assets/icons/UI/SvgSelector';
import { withVisibilityTimeout } from '../../HOC/withVisibilityTimeout';
import s from './Dropdown.module.scss';

type Option = {
  value: string;
  details?: string;
  icon?: ReactNode;
  addition?: ReactNode;
  key: number;
};

type DropdownItemProps = {
  item: Option;
  selectedItemId: number;
};

type DropdownListProps = {
  isOpen: boolean;
  options: Option[];
  listTitle: string;
  selectedItemId: number;
  setSelectedItemId: (item: number) => void;
  // onClick: (item: Option) => void;
};

type DropdownProps = {
  listTitle: string;
  options: Option[];
  defaultSelected: Option;
  allowNoneSelected: boolean;
  styles?: CSSProperties;
  side: 'left' | 'right';
  // onClick: (active: Option) => void;
};

function DropdownItem({ item, selectedItemId }: DropdownItemProps) {
  return (
    <div
      className={classNames(s.dropdown_item, {
        [s.dropdown_item__selected]: item.key === selectedItemId,
      })}
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

function DropdownList(
  props: JSX.IntrinsicElements['div'] & DropdownListProps
) {
  const {
    isOpen,
    listTitle,
    options,
    selectedItemId,
    setSelectedItemId,
    onClick,
    style,
  } = props;

  // function selectHandler(item: Option) {
  //   return () => {
  //     if (item.key) setSelectedItemId(item.key);
  //     onClick(item);
  //   };
  // }

  return (
    <div
      style={style}
      className={classNames(
        s.dropdown_list,
        isOpen ? s.dropdown_list__open : s.dropdown_list__closed
      )}
    >
      <h3 className={s.dropdown_title}>{listTitle}</h3>
      <div className={s.dropdown_options}>
        {options.map(item => (
          <DropdownItem
            item={item}
            key={item.key}
            selectedItemId={selectedItemId}
          />
        ))}
      </div>
    </div>
  );
}

const DropdownListTimeout = withVisibilityTimeout(DropdownList, 300);

export function Dropdown({
  options,
  defaultSelected,
  listTitle,
  allowNoneSelected,
  styles,
  side,
}: // onClick,
DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(defaultSelected.key);

  return (
    <div className={s.dropdown_container} style={{ ...styles }}>
      <button
        className={classNames(s.dropdown_active, {
          [s.dropdown_active__open]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={s.dropdown_active__value}>
          {defaultSelected.icon}
          <p>{defaultSelected.value}</p>
        </div>
        <div
          className={s.dropdown_active__expand}
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
        >
          <UISvgSelector id="arrow-down" />
        </div>
      </button>
      <DropdownListTimeout
        isOpen={isOpen}
        selectedItemId={selectedItemId}
        setSelectedItemId={setSelectedItemId}
        options={options}
        listTitle={listTitle}
        // onClick={onClick}
      />
    </div>
  );
}
