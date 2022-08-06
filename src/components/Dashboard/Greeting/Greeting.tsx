import React, { useEffect, useState } from 'react';
import { getGreetingByTime } from '../../../utils/getGreetingByTime';
import s from './Greeting.module.scss';
import { useCurrentDate } from './useCurrentDate';
import { useCurrentTime } from './useCurrentTime';

type Props = {
  name: string;
};

export function DashboardGreeting({ name }: Props) {
  const currentTime = useCurrentTime();
  const currentDate = useCurrentDate();

  return (
    <div className={s.greeting_container}>
      <h2>{`${getGreetingByTime(currentTime)}${name && ','} ${name}`}</h2>
      <p>{`Today is ${currentDate}`}</p>
    </div>
  );
}
