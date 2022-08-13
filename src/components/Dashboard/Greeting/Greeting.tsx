import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { getGreetingByTime } from '../../../utils/components/getGreetingByTime';
import { ContentSkeleton } from '../../UI/ContentLoader/ContentLoader';
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
          <ContentSkeleton
            type="line"
            width={190}
            height={53}
            bgColor="#c4c3ca7b"
            fgColor="#c4c3cab2"
          />
        )}
      </h2>
      <p>{`Today is ${currentDate}`}</p>
    </div>
  );
}
