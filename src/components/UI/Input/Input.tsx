import React, {
  ClipboardEventHandler,
  CSSProperties,
  FocusEventHandler,
  FormEventHandler,
  ReactNode,
} from 'react';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import s from './Input.module.scss';

type Props = {
  value?: string;
  placeholder: string;
  children?: ReactNode;
  icon?: ReactNode;
  styles?: CSSProperties;
  onChange?: FormEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onPaste?: ClipboardEventHandler<HTMLInputElement>;
  onInput?: FormEventHandler<HTMLInputElement>;
  isError?: boolean;
  error?: string;
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
  isError,
  error,
}: Props) {
  return (
    <div className={s.input_container}>
      <div className={s.input_top}>
        <span className={s.input_icon}>{icon}</span>
        <input
          style={{ ...styles, paddingLeft: icon ? '50px' : '0' }}
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
      {isError && (
        <div className={s.input_error}>
          <GlobalSvgSelector id="error" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
