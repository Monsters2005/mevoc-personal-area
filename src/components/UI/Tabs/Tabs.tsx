import React, { CSSProperties, useState } from 'react';
import classNames from 'classnames';
import s from './Tabs.module.scss';

export type TabOption<T = string> = {
  value: string;
  label?: T;
};

type Props<T extends string> = {
  styles?: CSSProperties;
  options: Record<T, TabOption<T>>;
  defaultActive: T;
  onClick: (active: TabOption) => void;
};

export function Tabs<T extends string>({
  options,
  styles,
  defaultActive,
  onClick,
}: Props<T>) {
  const transformOptions = Object.keys(options).map((key: string) => ({
    value: options[key as T].value,
    label: key as T,
  }));

  const [active, setActive] = useState<T>(defaultActive);

  function buttonHandler(item: TabOption<T>, i: number) {
    return () => {
      if (item.label) setActive(item.label);
      onClick(item);
    };
  }

  return (
    <div className={s.tabs_container} style={{ ...styles }}>
      {transformOptions.map((item, i) => (
        <button
          className={classNames(s.tabs_item, {
            [s.tabs_item_active]: active === item.label,
          })}
          key={item.label}
          onClick={buttonHandler(item, i)}
        >
          <p>{item.value}</p>
        </button>
      ))}
    </div>
  );
}
