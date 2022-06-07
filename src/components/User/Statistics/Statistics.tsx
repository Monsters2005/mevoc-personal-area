import React from 'react';
import { List } from '../../../@types/entities/List';
import { CardLayout } from '../../../layouts/CardLayout/CardLayout';
import s from './Statistics.module.scss';
import { StatisticsGraph } from './StatisticsGraph';

type Props = {
  list: List;
};

export function Statistics({ list }: Props) {
  return (
    <CardLayout
      title={list.name}
      description="Current Learning Progress"
      bgColor="#282936"
    >
      <div className={s.statistics_container}>
        <StatisticsGraph list={list} />
      </div>
    </CardLayout>
  );
}
