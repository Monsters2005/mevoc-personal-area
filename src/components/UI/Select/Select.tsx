import classNames from 'classnames';
import React, {
  ChangeEventHandler,
  CSSProperties,
  ReactNode,
  useState,
} from 'react';
import s from './Select.module.scss';

type Props = {
  styles?: CSSProperties;
  options: { name: string; icon: ReactNode; selected: boolean; key: number }[];
  defaultActive: number;
};

export function Select({ options, styles, defaultActive }: Props) {
  const [offset, setOffset] = useState(
    `${(100 / options.length) * (defaultActive - 1)}%`
  );
  const [active, setActive] = useState(defaultActive);

  return (
    <div className={s.select_container} style={{ ...styles }}>
      {options.map((item, i) => (
        <button
          className={classNames(
            s.select_item,
            active === item.key ? s.select_item_active : null
          )}
          key={item.key}
          onClick={() => {
            setActive(item.key);
            setOffset(`${(100 / options.length) * i}%`);
          }}
        >
          <span>{item.icon}</span>
          <p>{item.name}</p>
        </button>
      ))}
      <span
        className={s.select_active}
        style={{
          width: `${100 / options.length}%`,
          marginLeft: `${offset}`,
        }}
      />
    </div>
  );
}
