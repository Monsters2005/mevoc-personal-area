import React from 'react';
import { List } from '../../../@types/entities/List';
import { Word } from '../../../@types/entities/Word';
import { sortArrayByKey } from '../../../utils/sortArrayByKey';
import { Graph } from '../../UI/Graph/Graph';
import { LineChartData, LineChartOptions } from '../../UI/Graph/types';
import s from './Statistics.module.scss';

type Props = {
  list: List;
};

export function StatisticsGraph({ list }: Props) {
  const filteredWordList = list.words.filter(el => el.dateLearned);
  const sortedByDates = sortArrayByKey(filteredWordList, 'dateLearned');
  // TODO: Make a function which will be filling all empty spaces (dates when no
  // words have been learnt) in array with zeros (add key with date and empty array)

  function getGraphData(
    obj: Record<string, Word[]>,
    range: { from: string; to: string }
  ) {
    const nums = [];
    // eslint-disable-next-line
    for (const [_, value] of Object.entries<Word[]>(obj)) {
      nums.push(value.length);
    }

    // TODO: filter array based on presence of word date in range
    return nums;
  }

  function getGraphLabels(obj: Record<string, Word[]>) {
    const arr: string[] = [];
    Object.entries(obj).forEach(([key]) => arr.push(key));
    const labels = arr.map(el => {
      const d = new Date(el).getDay();
      return Number.isNaN(d)
        ? null
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d];
    });
    return labels;
  }

  const graphData = getGraphData(sortedByDates, { from: 'p', to: 'kl' });
  const labels = getGraphLabels(sortedByDates);

  const data: LineChartData = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Dataset 1',
        data: graphData,
        borderColor: '#FFEBA7',
        backgroundColor: '#FFEBA7',
        borderWidth: 3,
        cubicInterpolationMode: 'monotone',
        tension: 0.5,
        pointRadius: 4,
        pointBorderColor: '#FFEBA7',
        pointBackgroundColor: '#FFFFFF',
        pointBorderWidth: 2,
      },
    ],
  };

  const options: LineChartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          borderColor: 'transparent',
        },
        ticks: {
          color: '#95949D',
          font: {
            family: 'Poppins',
            size: 12,
            weight: '500',
          },
        },
      },
      y: {
        grid: {
          color: '#2E2F3C',
        },
        ticks: {
          precision: 0,
          color: '#C4C3CA',
          font: {
            family: 'Poppins',
            size: 12,
            weight: '500',
          },
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },

      tooltip: {
        callbacks: {
          title: () => '',
          // eslint-disable-next-line
          // @ts-ignore
          label: (item: LineChartTooltipItem) => `${item.formattedValue} ${
            Number(item.formattedValue) > 1 ? 'words' : 'word'
          }`,
        },

        bodyColor: '#C4C3CA',
        backgroundColor: '#3B3C4A',
        bodyFont: {
          family: 'Poppins',
          size: 14,
          weight: '500',
        },
        padding: 10,
        displayColors: false,
        titleAlign: 'center',
        cornerRadius: 10,
      },
    },

    interaction: {
      intersect: false,
    },
  };

  return (
    <div className={s.statistics_graph}>
      <Graph data={data} options={options} width={680} height={270} />
    </div>
  );
}
