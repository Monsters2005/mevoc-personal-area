import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from '../UI/DatePicker/DatePicker';

type Props = {
  name: string;
  defaultDate: Moment;
  label: string;
};

export function HookFormDatePicker({
  name,
  defaultDate,
  label,
  ...props
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [state, setState] = useState(defaultDate);

  return (
    <div>
      <Controller
        defaultValue={state}
        render={({ field: { ref, onChange, ...rest } }) => (
          <DatePicker
            {...rest}
            {...props}
            setDate={date => {
              setState(moment(date));
              onChange(date);
            }}
            isError={!!errors[name]}
            error={errors[name]?.message ?? ''}
            label={label}
            value={state}
          />
        )}
        control={control}
        name={name}
      />
    </div>
  );
}
