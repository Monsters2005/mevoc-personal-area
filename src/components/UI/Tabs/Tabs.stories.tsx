import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tabs, TabOption } from './Tabs';

export default {
  title: 'Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = function (args) {
  return <Tabs {...args} />;
};

export const DefaultState = Template.bind({});

const options = {
  account: {
    value: 'Account',
  },
  appearance: {
    value: 'Appearance',
  },
  notifications: {
    value: 'Notifications',
  },
  about: {
    value: 'About',
  },
};

DefaultState.args = {
  options,
  defaultActive: 'account',
  onClick: (active: TabOption) => {
    console.log(active);
  },
};
