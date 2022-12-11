/* eslint-disable */
import { useEffect, useState } from 'react';
import { dateLocale } from '../../../constants/locale';
import { LSKeys } from '../../../constants/LSKeys';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { useGetCurrentUserQuery } from '../../../store/api/userApi';

export function useCurrentDate() {
  const { data: user } = useGetCurrentUserQuery();
  // const [lang] = useLocalStorage<string>(LSKeys.UI_LANGUAGE, 'English');
  const { t } = useLocalTranslation(dateLocale);

  const timezoneOffset = new Date().getTimezoneOffset() / -60;
  function calcTime(offsetValue: number) {
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const nd = new Date(utc + 3600000 * offsetValue);

    return nd.toLocaleDateString(t('dateLocale'), {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  }

  return calcTime(timezoneOffset);
}
