import React, {
  ClipboardEventHandler,
  CSSProperties,
  FocusEventHandler,
  FormEventHandler,
  ReactNode,
  useState,
} from 'react';
import s from './Input.module.scss';

type Props = {
  value?: string;
  placeholder: string;
  children?: ReactNode;
  icon?: ReactNode;
  styles?: CSSProperties;
  onChange: FormEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onPaste?: ClipboardEventHandler<HTMLInputElement>;
  onInput?: FormEventHandler<HTMLInputElement>;
};

export function Input({
  children,
  value,
  placeholder,
  icon,
  styles,
  onChange,
  onBlur,
  onFocus,
  onInput,
  onPaste,
}: Props) {
  return (
    <div className={s.input_container}>
      <span className={s.input_icon}>{icon}</span>
      <input
        style={{ ...styles }}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onInput={onInput}
        onPaste={onPaste}
      />
      <span className={s.input_content}>{children}</span>
    </div>
  );
}
