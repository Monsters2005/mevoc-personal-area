import React, {
  ClipboardEventHandler,
  CSSProperties,
  FocusEventHandler,
  FormEventHandler,
  ReactNode,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import s from './Input.module.scss';

type Props = {
  name: string;
  defaultValue?: string;
  placeholder: string;
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
};

export function Input({
  children,
  name,
  defaultValue,
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
  ...props
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={s.input_container}>
      <div className={s.input_top}>
        <span className={s.input_icon}>{icon}</span>

        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ''}
          render={({ field: { ref, ...rest } }) => (
            <input
              {...rest}
              {...props}
              style={{ ...styles, paddingLeft: icon ? '50px' : '0' }}
              placeholder={placeholder}
              type={type}
              onFocus={onFocus}
              onInput={onInput}
              onPaste={onPaste}
            />
          )}
        />
        <span className={s.input_content}>{children}</span>
      </div>
      {!!errors[name] && (
        <div className={s.input_error}>
          <GlobalSvgSelector id="error" />
          <p>{errors[name]?.message ?? ''}</p>
        </div>
      )}
    </div>
  );
}
