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
    avatar: {
      path: 'fHrx3Yx',
      name: 'photo-1',
    },
  },
};
