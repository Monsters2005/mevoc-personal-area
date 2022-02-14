import React, { CSSProperties, useEffect, useState } from 'react';
import s from './CircularProgress.module.scss';

type Props = {
  width: number;
  height: number;
  circleStroke: number;
  bgColor: string;
  progressValue: number;
  percentStyles?: CSSProperties;
};

export function CircularProgress({
  width,
  height,
  circleStroke,
  bgColor,
  progressValue,
  percentStyles,
}: Props) {
  const radius = width / 2 - circleStroke / 2;

  const circumference = 2 * Math.PI * radius;
  function calcOffset(percent: number) {
    return circumference - (percent / 100) * circumference;
  }

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

  return (
    <div className={s.progress__bar__wrapper}>
      <div className={s.progress__bar__number} style={{ ...percentStyles }}>
        {progress}
        %
      </div>
      <div className={s.progress__bar__svg__wrapper}>
        <svg height={height} width={width} className={s.progress__bar}>
          <circle
            fill="none"
            strokeWidth={circleStroke}
            cx={width / 2}
            cy={height / 2}
            r={radius}
            stroke={bgColor}
            className={s.progress__bar__circle__bg}
          />
          <circle
            style={{
              strokeDashoffset: calcOffset(progressValue),
              strokeDasharray: `${circumference} ${circumference}`,
            }}
            height={height}
            width={width}
            fill="none"
            strokeWidth={circleStroke}
            cx={width / 2}
            cy={height / 2}
            r={radius}
            className={s.progress__bar__circle}
          />
        </svg>
      </div>
    </div>
  );
}
