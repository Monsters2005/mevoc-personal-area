import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';

import moment, { Moment } from 'moment';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import s from './Calendar.module.scss';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export type CalendarDates = {
  startDate: Moment | null;
  endDate: Moment | null;
};

export type Dates = {
  startDate: Date;
  endDate: Date;
};

type Props = {
  startDate: Date;
  endDate: Date;
  setGraphDates: Dispatch<SetStateAction<Dates>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
};

export function Calendar({
  startDate,
  endDate,
  setGraphDates,
  setActiveTab,
}: Props) {
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
        onDatesChange={({ startDate, endDate }) => {
          setDates(() => ({
            startDate,
            endDate,
          }));
          setGraphDates({
            startDate: new Date(startDate?.toString() || ''),
            endDate: new Date(endDate?.toString() || ''),
          });
          if (setActiveTab) {
            setActiveTab('off');
          }
        }}
        focusedInput={focusedInput}
        // eslint-disable-next-line
        onFocusChange={(focusedInput: FocusedInputShape | null) => {
          setFocusedInput(focusedInput);
        }}
      />
    </div>
  );
}
