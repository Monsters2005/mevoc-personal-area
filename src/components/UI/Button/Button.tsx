import React, {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  ReactNode,
  Ref,
  RefObject,
} from 'react';
import { TypeReferenceType } from 'typescript';
import s from './Button.module.scss';

type Props = {
  type: 'primary' | 'secondary' | 'small';
  children: ReactNode;
  styles?: CSSProperties;
  HTMLType?: 'button' | 'submit' | 'reset';
  onClick: () => void;
  disabled?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({
    children, type, styles, HTMLType, onClick, disabled,
  }, ref) => (
    <button
      ref={ref}
      style={disabled ? { ...styles, opacity: '0.5' } : { ...styles }}
      type={HTMLType}
      className={s[`button_${type}`]}
      onClick={!disabled ? onClick : () => null}
    >
      {children}
    </button>
  )
);

Button.defaultProps = {
  styles: {},
  HTMLType: 'button',
  disabled: false,
};
