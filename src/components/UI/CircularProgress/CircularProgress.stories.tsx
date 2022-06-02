import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CircularProgress } from './CircularProgress';

export default {
  title: 'CircularProgress',
  component: CircularProgress,
} as ComponentMeta<typeof CircularProgress>;

const Template: ComponentStory<typeof CircularProgress> = function (args) {
  return <CircularProgress {...args} />;
};

export const CircularProgressExample = Template.bind({});

CircularProgressExample.args = {};
