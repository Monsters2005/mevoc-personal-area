import { Moment } from 'moment';
import React, { useState } from 'react';
import { SingleDatePicker, FocusedInputShape } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import { UISvgSelector } from '../UISvgSelector';
import s from './DatePicker.module.scss';

type Date = Moment | null;

type Props = {
  value: Date;
  label: string;
  name: string;
  isError?: boolean;
  error?: string;
  setDate: (date: Date) => void;
  onBlur: () => void;
};

export default function DatePicker({
  value,
  setDate,
  isError,
  error,
  name,
  onBlur,
  label,
  ...props
}: Props) {
  const [focusedInput, setFocusedInput] = useState(false);

  return (
    <div className={s.datepicker_container}>
      {label && (
        <label className={s.datepicker_label} htmlFor={name}>
          {label}
        </label>
      )}
      <div className={s.datepicker_input}>
        <SingleDatePicker
          {...props}
          hideKeyboardShortcutsPanel
          inputIconPosition="after"
          numberOfMonths={1}
          keepOpenOnDateSelect
          displayFormat="DD.MM.YYYY"
          isOutsideRange={() => false}
          date={value}
          onDateChange={setDate}
          focused={focusedInput}
          onFocusChange={({ focused }) => {
            setFocusedInput(focused);
          }}
          id="dob"
        />
        <UISvgSelector id="calendar" />
      </div>

      {isError && (
        <div className={s.input_error}>
          <GlobalSvgSelector id="error" />
          <p>{error ?? ''}</p>
        </div>
      )}
    </div>
  );
}
