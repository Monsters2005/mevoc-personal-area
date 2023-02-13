/* eslint-disable */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { List } from '../../../@types/entities/List';
import { Word } from '../../../@types/entities/Word';
import { weekdays } from '../../../constants/kit/weekdays';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { sortArrayByKey } from '../../../utils/common/sortArrayByKey';
import { checkDateInRange } from '../../../utils/dates/checkDateInRange';
import { enumerateDaysBetweenDates } from '../../../utils/dates/enumerateDaysBetweenDates';
import { Graph } from '../../UI/Graph/Graph';
import {
  LineChartData,
  LineChartOptions,
  LineChartTooltipItem,
} from '../../UI/Graph/types';
import { Dates } from '../Calendar/types';
import s from './Statistics.module.scss';
import usertr from '../../../pages/UserProfile/UserProfile.i18n.json';

type Props = {
  list: List;
  dateRange: Dates;
};

export function StatisticsGraph({ list, dateRange }: Props) {
  const filteredWordList = list?.words.filter(el => el.dateLearned) || [];
  const sortedByDates = sortArrayByKey(filteredWordList, 'dateLearned');
  const datesObj = fillRange(sortedByDates);
  const { t } = useLocalTranslation(usertr);

  function fillRange(obj: Record<string, Word[]>) {
    const dates = [];
    for (const date in obj) {
      dates.push(date);
    }

    const datesList = enumerateDaysBetweenDates({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });

    const fillDates: Record<string, Word[]> = {};

    datesList.map(el => {
      const key = moment(el).format('YYYY-MM-DD');
      obj.hasOwnProperty(key)
        ? (fillDates[key] = obj[key])
        : (fillDates[key] = []);
    });

    return fillDates;
  }

  function getGraphData(obj: Record<string, Word[]>, range: Dates) {
    const nums = [];

    // eslint-disable-next-line
    for (const [_, value] of Object.entries<Word[]>(obj)) {
      const inRange = checkDateInRange(_, range, 'YYYY-MM-DD');
      inRange ? nums.push(value.length) : nums.push(0);
    }

    return nums;
  }

  function getGraphLabels(obj: Record<string, Word[]>) {
    const arr: string[] = [];
    Object.entries(obj).forEach(([key]) => arr.push(key));
    const labels = arr.map(el => {
      const d = new Date(el).getDay();
      return Number.isNaN(d) ? null : t(weekdays[d]);
    });
    return labels;
  }

  const graphData = getGraphData(datesObj, dateRange);
  const labels = getGraphLabels(datesObj);

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
        labels: {
          font: {
            family: 'Poppins',
          },
        },
      },

      tooltip: {
        callbacks: {
          title: () => '',
          label: (item: LineChartTooltipItem) =>
            `${item.formattedValue} ${
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
      <Graph data={data} options={options} width={640} height={270} />
    </div>
  );
}
