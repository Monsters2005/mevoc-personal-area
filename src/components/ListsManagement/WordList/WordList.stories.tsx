import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DashboardWordList } from './WordList';
import { list } from '../../../mocks/list';

export default {
  title: 'DashboardWordList',
  component: DashboardWordList,
} as ComponentMeta<typeof DashboardWordList>;

const Template: ComponentStory<typeof DashboardWordList> = function (args) {
  return <DashboardWordList words={list.words} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {};
