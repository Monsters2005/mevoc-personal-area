import { useEffect, useState } from 'react';

export function useCurrentTime() {
  const timezoneOffset = new Date().getTimezoneOffset() / -60;
  function calcTime(offsetValue: number) {
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const nd = new Date(utc + 3600000 * offsetValue);

    return nd.getHours();
  }

  return calcTime(timezoneOffset);
}
