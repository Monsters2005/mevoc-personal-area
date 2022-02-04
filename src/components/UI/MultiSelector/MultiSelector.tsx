import React, { CSSProperties, ReactNode, useState } from 'react';
import classNames from 'classnames';
import s from './MultiSelector.module.scss';
import { useOffset } from './useOffset';

export type MultiSelectorOption<T = string> = {
  value: string;
  icon: ReactNode;
  label?: T;
};

type Props<T extends string> = {
  styles?: CSSProperties;
  options: Record<T, MultiSelectorOption<T>>;
  defaultActive: T;
  onClick: (active: MultiSelectorOption) => void;
};

export function MultiSelector<T extends string>({
  options,
  styles,
  defaultActive,
  onClick,
}: Props<T>) {
  const transformOptions = Object.keys(options).map((key: string) => ({
    value: options[key as T].value,
    label: key as T,
    icon: options[key as T].icon,
  }));

  const defaultIndex = transformOptions.findIndex(
    item => item.label === defaultActive
  );
  const { offset, recalcOffset } = useOffset(
    transformOptions.length,
    defaultIndex
  );
  const [active, setActive] = useState<T>(defaultActive);

  function buttonHandler(item: MultiSelectorOption<T>, i: number) {
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
          marginLeft: `${offset}`,
        }}
      />
    </div>
  );
}
