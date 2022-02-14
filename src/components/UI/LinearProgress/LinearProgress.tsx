import React from 'react';
import s from './LinearProgress.module.scss';

type Props = {
  progressValue: number;
  bgColor: string;
  lineStroke: number;
  showPercent: boolean;
};

export function LinearProgress({
  progressValue,
  bgColor,
  lineStroke,
  showPercent,
}: Props) {
  return (
    <div className={s.linearprogress_container}>
      <div
        className={s.linearprogress_line_wrapper}
        style={{ background: bgColor, height: `${lineStroke}px` }}
      >
        <div
          className={s.linearprogress_line}
          style={{ width: `${progressValue}%`, height: `${lineStroke}px` }}
        />
      </div>

      {showPercent && (
        <div className={s.linearprogress_number}>
          {progressValue}
          %
        </div>
      )}
    </div>
  );
}
