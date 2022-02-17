import React, { CSSProperties, ReactNode, useState } from 'react';
import classNames from 'classnames';
import s from './MultiSelector.module.scss';
import { useOffset } from './useOffset';

export type MultiSelectorOption = {
  value: string;
  icon: ReactNode;
  label?: string;
};

type MultiSelectorObject = Record<string, MultiSelectorOption>;

type Props<T> = {
  styles?: CSSProperties;
  options: MultiSelectorObject;
  defaultActive: keyof T;
  onClick: (active: MultiSelectorOption) => void;
};

export function MultiSelector<T extends MultiSelectorObject>({
  options,
  styles,
  defaultActive,
  onClick,
}: Props<T>) {
  const transformOptions = Object.keys(options).map((key: string) => ({
    value: options[key].value,
    label: key,
    icon: options[key].icon,
  }));

  const defaultIndex = transformOptions.findIndex(
    item => item.label === defaultActive
  );
  const { offset, recalcOffset } = useOffset(
    transformOptions.length,
    defaultIndex
  );
  const [active, setActive] = useState<keyof T>(defaultActive);

  function buttonHandler(item: MultiSelectorOption, i: number) {
    return () => {
      if (item.label) setActive(item.label);
      recalcOffset(i);
      onClick(item);
    };
  }

  return (
    <div className={s.select_container} style={{ ...styles }}>
      {transformOptions.map((item, i) => (
        <button
          className={classNames(s.select_item, {
            [s.select_item_active]: active === item.label,
          })}
          key={item.label}
          onClick={buttonHandler(item, i)}
        >
          <span>{item.icon}</span>
          <p>{item.value}</p>
        </button>
      ))}
      <span
        className={s.select_active}
        style={{
          width: `${100 / transformOptions.length}%`,
          marginLeft: offset,
        }}
      />
    </div>
  );
}
