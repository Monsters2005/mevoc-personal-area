import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SidebarProfile } from './Profile';

export default {
  title: 'SidebarProfile',
  component: SidebarProfile,
} as ComponentMeta<typeof SidebarProfile>;

const Template: ComponentStory<typeof SidebarProfile> = function (args) {
  return <SidebarProfile {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {
  user: {
    firstName: 'Karina',
    lastName: 'Carmichael',
    username: 'perfechate',
    avatarUrl:
      'https://images.unsplash.com/photo-1518288774672-b94e808873ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=738&q=80',
  },
};
