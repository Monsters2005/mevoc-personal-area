import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MultiSelector } from './MultiSelector';

export default {
  title: 'MultiSelector',
  component: MultiSelector,
} as ComponentMeta<typeof MultiSelector>;

const Template: ComponentStory<typeof MultiSelector> = function (args) {
  return <MultiSelector {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {
  options: {
    small: {
      value: 'small',
      icon: <p />,
    },
    normal: {
      value: 'normal',
      icon: <p />,
    },
  },
  defaultActive: 'small',
  onClick: item => {
    console.log(item);
  },
};
