import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import s from './Switch.module.scss';

type Props = {
  onChange: () => void;
  defaultChecked: boolean;
};

export function Switch({ onChange, defaultChecked }: Props) {
  return (
    <div className={s.switch_container}>
      <input
        className={s.switch_checkbox}
        id="switch"
        type="checkbox"
        checked={defaultChecked}
        onChange={onChange}
      />
      <label className={s.switch_label} htmlFor="switch">
        <span className={s.switch_button} />
      </label>
    </div>
  );
}
