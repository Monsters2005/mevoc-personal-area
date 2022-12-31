import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Moment } from 'moment';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import s from './Calendar.module.scss';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../../../styles/lib/calendar.scss';

type CalendarDates = {
  startDate: Moment | null;
  endDate: Moment | null;
};

type Props = {
  setDates: (dates: CalendarDates) => void;
  dates: CalendarDates;
};

export function Calendar({ setDates, dates }: Props) {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>('startDate');

  const isSmallScreen = useMediaQuery({ maxWidth: '1500px' });

  return (
    <div className={s.calendar_container}>
      <DateRangePicker
        hideKeyboardShortcutsPanel
        inputIconPosition="after"
        numberOfMonths={1}
        keepOpenOnDateSelect
        displayFormat="DD.MM.YY"
        isOutsideRange={() => false}
        customArrowIcon={' '}
        startDate={dates.startDate}
        startDateId="1"
        endDate={dates.endDate}
        endDateId="2"
        keepFocusOnInput
        onDatesChange={(data: CalendarDates) => {
          setDates(data);
        }}
        focusedInput={focusedInput}
        onFocusChange={(focused: FocusedInputShape | null) => {
          setFocusedInput(focused || isSmallScreen ? focused : 'endDate');
        }}
      />
    </div>
  );
}
