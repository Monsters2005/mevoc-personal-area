import React, { useEffect, useState } from 'react';
import { ranges } from '../constants/ranges';

export function getGreetingByTime(time: number) {
  const [greeting, setGreeting] = useState('');

  function checkRange(x: number, min: number, max: number) {
    return x >= min && x <= max;
  }

  useEffect(() => {
    function getGreeting() {
      for (let i = 0; i < ranges.length; i++) {
        if (checkRange(time, ranges[i].min, ranges[i].max)) {
          setGreeting(ranges[i].output);
        }
      }
    }
    getGreeting();
  }, [time]);
  return greeting;
}
