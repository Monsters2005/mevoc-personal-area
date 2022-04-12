import { ChartData, ChartOptions, TooltipItem } from 'chart.js';

export type LineChartData = ChartData<'line'>;
export type LineChartOptions = ChartOptions<'line'>;
export type LineChartTooltipItem = TooltipItem<'line'>;

export type Word = {
  wordNative: string;
  wordLearning: string;
  dateLearned: null | string;
  id: number;
};
