import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
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
      <h2>
        {getGreetingByTime(currentTime)}
        ,&nbsp;
        {name || (
          <ContentLoader
            speed={2}
            width={190}
            height={53}
            viewBox="0 0 165 53"
            backgroundColor="#c4c3ca7b"
            foregroundColor="#c4c3cab2"
          >
            <rect x="0" y="34" rx="10" ry="10" width="165" height="18" />
          </ContentLoader>
        )}
      </h2>
      <p>{`Today is ${currentDate}`}</p>
    </div>
  );
}
