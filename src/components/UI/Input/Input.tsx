import React, {
  ClipboardEventHandler,
  CSSProperties,
  FocusEventHandler,
  FormEventHandler,
  ReactNode,
  Ref,
} from 'react';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import s from './Input.module.scss';

type Props = {
  name: string;
  value?: string;
  placeholder?: string;
  children?: ReactNode;
  icon?: ReactNode;
  styles?: CSSProperties;
  type?: string;
  onChange?: FormEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onPaste?: ClipboardEventHandler<HTMLInputElement>;
  onInput?: FormEventHandler<HTMLInputElement>;
  isError?: boolean;
  error?: string;
  label?: string;
  ref?: (inputElement: HTMLElement) => void;
};

export function Input({
  children,
  name,
  value,
  placeholder,
  type,
  icon,
  styles,
  onChange,
  onBlur,
  onFocus,
  onInput,
  onPaste,
  isError,
  error,
  label,
  ref,
  ...props
}: Props) {
  return (
    <div className={s.input_container}>
      {label && (
        <label className={s.input_label} htmlFor={name}>
          {label}
        </label>
      )}
      <div className={s.input_top}>
        <span className={s.input_icon}>{icon}</span>
        <input
          {...props}
          value={value}
          style={{ ...styles, paddingLeft: icon ? '50px' : '10px' }}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          onFocus={onFocus}
          onInput={onInput}
          onPaste={onPaste}
        />

        <span className={s.input_content}>{children}</span>
      </div>
      {isError && (
        <div className={s.input_error} style={{ width: styles?.width }}>
          <GlobalSvgSelector id="error" />
          <p>{error ?? ''}</p>
        </div>
      )}
    </div>
  );
}
