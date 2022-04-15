import React, { CSSProperties, ReactNode } from 'react';
import s from './Button.module.scss';

type Props = {
  type: 'primary' | 'secondary' | 'small';
  children: ReactNode;
  styles?: CSSProperties;
  HTMLType?: 'button' | 'submit' | 'reset';
  onClick: () => void;
};

export function Button({
  children,
  type,
  styles = {},
  HTMLType = 'button',
  onClick,
}: Props) {
  return (
    <button
      style={{ ...styles }}
      type={HTMLType}
      className={s[`button_${type}`]}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
