import { useEffect, useState } from 'react';

export function useTimeout(progressValue: number) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress > +progressValue.toFixed(0)) {
      setProgress(0);
      return;
    }

    let timeoutId = -1;
    if (progress !== +progressValue.toFixed(0)) {
      timeoutId = +setTimeout(setProgress, 10, progress + 1);
    }
    /* eslint-disable consistent-return */
    return () => clearTimeout(timeoutId);
  }, [progress, progressValue]);

  return progress;
}
