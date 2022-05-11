import React, {
  ClipboardEventHandler,
  CSSProperties,
  FocusEventHandler,
  FormEventHandler,
  ReactNode,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '../UI/Input/Input';

type Props = {
  name: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  icon?: ReactNode;
  children?: ReactNode;
  styles?: CSSProperties;
  onChange?: FormEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onPaste?: ClipboardEventHandler<HTMLInputElement>;
  onInput?: FormEventHandler<HTMLInputElement>;
};

export default function HookFormInput({
  name,
  defaultValue,
  ...props
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field: { ref, ...rest } }) => (
        <Input
          {...rest}
          {...props}
          isError={!!errors[name]}
          error={errors[name]?.message ?? ''}
        />
      )}
    />
  );
}
