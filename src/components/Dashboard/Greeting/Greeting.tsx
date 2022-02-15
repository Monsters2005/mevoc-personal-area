import React, { useEffect, useState } from 'react';
import s from './Greeting.module.scss';
import { useCurrentDate } from './useCurrentDate';
import { useCurrentTime } from './useCurrentTime';

type Props = {
  name: string;
};

export function DashboardGreeting({ name }: Props) {
  const currentTime = useCurrentTime();
  const currentDate = useCurrentDate();

  const [greeting, setGreeting] = useState('');

  function checkRange(x: number, min: number, max: number) {
    return x >= min && x <= max;
  }

  const ranges = [
    { min: 6, max: 11, output: 'Good morning' },
    { min: 12, max: 18, output: 'Good afternoon' },
    { min: 19, max: 23, output: 'Good evening' },
    { min: 24, max: 5, output: 'Good night' },
  ];

  useEffect(() => {
    function getGreetingByTime(time: number) {
      for (let i = 0; i < ranges.length; i++) {
        if (checkRange(time, ranges[i].min, ranges[i].max)) {
          setGreeting(ranges[i].output);
        }
      }
    }
    getGreetingByTime(currentTime);
  }, [currentTime]);

  return (
    <div className={s.greeting_container}>
      <h2>
        {greeting}
        ,&nbsp;
        {name}
      </h2>
      <p>
        Today is&nbsp;
        {currentDate}
      </p>
    </div>
  );
}
