import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';

import moment, { Moment } from 'moment';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import s from './Calendar.module.scss';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Dates } from './types';

type CalendarDates = {
  startDate: Moment | null;
  endDate: Moment | null;
};

type Props = {
  startDate: Date;
  endDate: Date;
  setGraphDates: Dispatch<SetStateAction<Dates>>;
};

export function Calendar({ startDate, endDate, setGraphDates }: Props) {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);

  const [dates, setDates] = useState<CalendarDates>({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    setDates({ startDate: moment(startDate), endDate: moment(endDate) });
    setGraphDates({ startDate, endDate });
  }, [startDate, endDate]);

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
        // eslint-disable-next-line
        onDatesChange={({ startDate, endDate }: CalendarDates) => {
          setDates(() => ({
            startDate,
            endDate,
          }));
          setGraphDates({
            startDate: new Date(startDate?.toString() || ''),
            endDate: new Date(endDate?.toString() || ''),
          });
        }}
        focusedInput={focusedInput}
        onFocusChange={(focused: FocusedInputShape | null) => {
          setFocusedInput(focused);
        }}
      />
    </div>
  );
}
