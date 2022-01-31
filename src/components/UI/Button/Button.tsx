import React, { CSSProperties, ReactNode } from 'react';
import s from './Button.module.scss';

type Props = {
  type: 'primary' | 'secondary' | 'small';
  children: ReactNode;
  styles?: CSSProperties;
  HTMLType?: 'button' | 'submit' | 'reset';
  func: () => void;
};

export function Button({
  children,
  type,
  styles = {},
  HTMLType = 'button',
  func,
}: Props) {
  return (
    <button
      style={{ ...styles }}
      type={HTMLType}
      className={s[`button_${type}`]}
      onClick={func}
    >
      {children}
    </button>
  );
}
