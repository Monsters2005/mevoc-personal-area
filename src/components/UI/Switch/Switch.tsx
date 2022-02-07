import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import s from './Switch.module.scss';

type Props = {
  onChange: (checked: boolean) => void;
  defaultChecked: boolean;
};

export function Switch({ onChange, defaultChecked }: Props) {
  const [checked, setChecked] = useState(defaultChecked);

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
    onChange(e.target.checked);
  }

  return (
    <div className={s.switch_container}>
      <input
        className={s.switch_checkbox}
        id="switch"
        type="checkbox"
        checked={checked}
        onChange={changeHandler}
      />
      <label className={s.switch_label} htmlFor="switch">
        <span className={s.switch_button} />
      </label>
    </div>
  );
}
