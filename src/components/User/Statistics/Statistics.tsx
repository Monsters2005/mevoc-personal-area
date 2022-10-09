import moment from 'moment';
import React, { useState } from 'react';
import { List } from '../../../@types/entities/List';
import { CardLayout } from '../../../layouts/CardLayout/CardLayout';
import { Calendar } from '../Calendar/Calendar';
import { Dates } from '../Calendar/types';
import s from './Statistics.module.scss';
import { StatisticsGraph } from './StatisticsGraph';

type Props = {
  list: List;
};

export function Statistics({ list }: Props) {
  const [dates, setDates] = useState<Dates>({
    startDate: moment(new Date(Date.now() - 604800000)),
    endDate: moment(new Date(Date.now())),
  });
  console.log('dates', dates);

  return (
    <CardLayout
      title={list?.name}
      description="Current Learning Progress"
      bgColor="#282936"
    >
      <div className={s.statistics_container}>
        <div className={s.statistics_calendar}>
          <Calendar dates={dates} setDates={setDates} />
        </div>
        <StatisticsGraph dateRange={dates} list={list} />
      </div>
    </CardLayout>
  );
}
