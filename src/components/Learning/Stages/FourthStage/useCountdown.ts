import React, { useEffect, useState } from 'react';

export function useCountdown(min?: number, sec?: number) {
  const [minutes, setMinutes] = useState(min || 0);
  const [seconds, setSeconds] = useState(sec || 0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return { minutes, seconds, setSeconds };
}
