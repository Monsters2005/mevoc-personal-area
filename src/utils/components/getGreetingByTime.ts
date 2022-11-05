import React, { useEffect, useState } from 'react';
import { timeRanges } from '../../constants/ranges';

export function getGreetingByTime(time: number) {
  const [greeting, setGreeting] = useState('');

  function checkRange(x: number, min: number, max: number) {
    return x >= min && x <= max;
  }

  useEffect(() => {
    function getGreeting() {
      for (let i = 0; i < timeRanges.length; i++) {
        if (checkRange(time, timeRanges[i].min, timeRanges[i].max)) {
          setGreeting(timeRanges[i].output);
        }
      }
    }
    getGreeting();
  }, [time]);
  return greeting;
}
