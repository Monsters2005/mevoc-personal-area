import React, {
  CSSProperties, ReactNode, useEffect, useState,
} from 'react';
import s from './CircularProgress.module.scss';
import { useTimeout } from './useTimeout';

type Props = {
  width?: number;
  height?: number;
  circleStroke?: number;
  bgColor?: string;
  progressValue: number;
  percentStyles?: CSSProperties;
  styles?: CSSProperties;
  asset?: ReactNode;
};

export function CircularProgress({
  width = 200,
  height = 200,
  circleStroke = 4,
  bgColor = '#ffffff',
  progressValue,
  percentStyles,
  styles,
  asset,
}: Props) {
  const radius = width / 2 - circleStroke / 2;

  const circumference = 2 * Math.PI * radius;
  function calcOffset(percent: number) {
    return circumference - (percent / 100) * circumference;
  }

  const progress = useTimeout(progressValue);

  return (
    <div className={s.progress__bar__wrapper} style={{ ...styles }}>
      <div className={s.progress__bar__number} style={{ ...percentStyles }}>
        {progress}
        %
      </div>
      {asset && (
        <div className={s.progress__bar__asset}>
          <hr />
          {asset}
        </div>
      )}
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
