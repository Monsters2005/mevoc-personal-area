import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { getGreetingByTime } from '../../../utils/components/getGreetingByTime';
import { ContentSkeleton } from '../../UI/ContentLoader/ContentLoader';
import s from './Greeting.module.scss';
import { useCurrentDate } from './useCurrentDate';
import { useCurrentTime } from './useCurrentTime';
import translations from './Greeting.i18n.json';

type Props = {
  name: string;
};

export function DashboardGreeting({ name }: Props) {
  const currentTime = useCurrentTime();
  const currentDate = useCurrentDate();
  const { t } = useLocalTranslation(translations);

  return (
    <div className={s.greeting_container}>
      <h2>
        {t(getGreetingByTime(currentTime))}
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
      <p>{`${t('todayIs')} ${currentDate}`}</p>
    </div>
  );
}
