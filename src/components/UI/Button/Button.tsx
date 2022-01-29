import React, { CSSProperties, ReactNode } from 'react';
import s from './Button.module.scss';

type Props = {
  type: 'primary' | 'secondary' | 'small';
  children: ReactNode;
  styles?: CSSProperties;
  HTMLType?: 'button' | 'submit' | 'reset';
};

export function Button({
  children,
  type,
  styles = {},
  HTMLType = 'button',
}: Props) {
  return (
    <button
      style={{ ...styles }}
      type={HTMLType}
      className={s[`button_${type}`]}
    >
      {children}
    </button>
  );
}
