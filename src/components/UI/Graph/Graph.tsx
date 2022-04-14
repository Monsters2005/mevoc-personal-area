import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import s from './Graph.module.scss';
import { LineChartData } from './types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

type Props = {
  data: LineChartData;
  height?: number;
  width?: number;
  options: ChartOptions;
};

export function Graph({
  height = 150, width = 300, data, options,
}: Props) {
  return (
    <div
      className={s.graph_container}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Line options={options} data={data} />
    </div>
  );
}
