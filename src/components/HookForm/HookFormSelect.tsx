import React, { SetStateAction, useState } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { Dropdown } from '../UI/DropDown/Dropdown';
import { Option } from '../UI/DropDown/types';

type Props = {
  options: Option[];
  defaultSelected: Option;
  label: string;
  name: string;
};

const dropdownStyles = {
  width: '300px',
  height: '50px',
  background: '#1F2029',
};

export default function HookFormSelect({
  options,
  defaultSelected,
  label,
  name,
  ...props
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [state, setState] = useState<Option | null>(defaultSelected);

  return (
    <div>
      <Controller
        defaultValue={state?.value}
        render={({ field: { ref, onChange, ...rest } }) => (
          <Dropdown
            {...rest}
            {...props}
            options={options}
            setSelectedItem={(item: Option | null) => {
              setState(item);
              onChange(item?.value);
            }}
            selectedItem={state}
            allowNoneSelected={false}
            label={label}
            isError={!!errors[name]}
            error={errors.multiple && (errors.multiple as FieldError).message}
            styles={dropdownStyles}
          />
        )}
        control={control}
        name={name}
      />
    </div>
  );
}
