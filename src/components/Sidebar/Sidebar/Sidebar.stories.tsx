import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Sidebar } from './Sidebar';

export default {
  title: 'Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = function (args) {
  return <Sidebar {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {
  pages: {
    dashboard: {
      icon: 'house',
      name: 'Dashboard',
      path: '/',
    },
    listManagement: {
      icon: 'list',
      name: 'Lists Management',
      path: '/lists-management',
    },
    userProfile: {
      icon: 'user',
      name: 'User Profile',
      path: '/user-profile',
    },
    settings: {
      icon: 'settings',
      name: 'Settings',
      path: '/settings',
    },
  },
  actions: [
    {
      label: 'Sign Out',
      action: () => console.log('sign out'),
      icon: 'signout',
      key: 'sign_out',
    },
    {
      label: 'Help',
      action: () => console.log('help'),
      icon: 'question',
      key: 'help',
    },
  ],
};
