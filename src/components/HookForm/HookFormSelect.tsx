import React, {
  CSSProperties,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { dropdownStyles } from '../../shared/styles/dropdown-variations';
import { Dropdown } from '../UI/DropDown/Dropdown';
import { Option } from '../UI/DropDown/types';

type Props = {
  options: Option[];
  defaultSelected: Option;
  label: string;
  name: string;
  search?: boolean;
  styles?: CSSProperties;
  listStyles?: CSSProperties;
};

export default function HookFormSelect({
  options,
  defaultSelected,
  label,
  name,
  search,
  styles,
  listStyles,
  ...props
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [state, setState] = useState<Option | undefined>(defaultSelected);

  useEffect(() => {
    setState(defaultSelected);
  }, [defaultSelected]);

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
            styles={styles || dropdownStyles}
            listStyles={listStyles}
            searchBar={search}
          />
        )}
        control={control}
        name={name}
      />
    </div>
  );
}
