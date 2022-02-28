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

  function getFullGreeting(fullName: string, greeting: string) {
    return `${greeting}, ${fullName}`;
  }

  function getFullDate(date: string) {
    return `Today is ${date}`;
  }

  return (
    <div className={s.greeting_container}>
      <h2>{getFullGreeting(name, getGreetingByTime(currentTime))}</h2>
      <p>{getFullDate(currentDate)}</p>
    </div>
  );
}
