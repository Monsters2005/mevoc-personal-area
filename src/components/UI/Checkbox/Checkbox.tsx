import classNames from 'classnames';
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import s from './Checkbox.module.scss';

type Props = {
  onChange: (checked: boolean) => void;
  defaultChecked: boolean;
};

export function Checkbox({ onChange, defaultChecked }: Props) {
  const [checked, setChecked] = useState(defaultChecked);

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
    onChange(e.target.checked);
  }

  return (
    <label className={classNames(s.checkbox, s.checkbox_bounce)}>
      <input type="checkbox" checked={checked} onChange={changeHandler} />
      <svg viewBox="0 0 21 21">
        <polyline points="5 10.75 8.5 14.25 16 6" />
      </svg>
    </label>
  );
}
