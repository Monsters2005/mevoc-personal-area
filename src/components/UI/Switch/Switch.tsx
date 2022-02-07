import React, { ChangeEventHandler } from 'react';
import s from './Switch.module.scss';

type Props = {
  onChange: ChangeEventHandler;
  defaultState: boolean;
};

export function Switch({ onChange, defaultState }: Props) {
  return (
    <div className={s.switch_container}>
      <input
        className={s.switch_checkbox}
        id="switch"
        type="checkbox"
        checked={defaultState}
        onChange={onChange}
      />
      <label className={s.switch_label} htmlFor="switch">
        <span className={s.switch_button} />
      </label>
    </div>
  );
}
