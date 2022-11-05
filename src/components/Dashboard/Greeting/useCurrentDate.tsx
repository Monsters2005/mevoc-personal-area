import { useEffect, useState } from 'react';
import { dateLocale } from '../../../constants/locale';
import { useGetCurrentUserQuery } from '../../../store/api/userApi';

export function useCurrentDate() {
  const { data: user } = useGetCurrentUserQuery();

  const timezoneOffset = new Date().getTimezoneOffset() / -60;
  function calcTime(offsetValue: number) {
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const nd = new Date(utc + 3600000 * offsetValue);

    return nd.toLocaleDateString(
      dateLocale[(user?.nativeLang as keyof typeof dateLocale) || 'English'],
      {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }
    );
  }

  return calcTime(timezoneOffset);
}
