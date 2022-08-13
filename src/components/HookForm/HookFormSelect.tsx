import React, { SetStateAction, useState } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { dropdownStyles } from '../../shared/styles/dropdown-variations';
import { Dropdown } from '../UI/DropDown/Dropdown';
import { Option } from '../UI/DropDown/types';

type Props = {
  options: Option[];
  defaultSelected: Option;
  label: string;
  name: string;
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
  const [state, setState] = useState<Option | undefined>(defaultSelected);

  return (
    <div>
      <Controller
        defaultValue={state?.value}
        render={({ field: { ref, onChange, ...rest } }) => (
          <Dropdown
            {...rest}
            {...props}
            options={options}
            setSelectedItem={(item: Option | undefined) => {
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
