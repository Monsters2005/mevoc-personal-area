import { ReactNode } from 'react';
import { useSignoutMutation } from '../store/api/authApi';
import { Path } from './routes';

export const pages = {
  dashboard: {
    icon: 'house',
    name: 'Dashboard',
    path: '/dashboard',
  },
  listsManagement: {
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
};

export const actions = [
  {
    label: 'Sign Out',
    icon: 'signout',
    key: 'sign_out',
  },
  {
    label: 'Help',
    icon: 'question',
    key: 'help',
  },
];

export const profileActions: Partial<{
  value: string;
  path: string;
  key: string;
  func: () => void;
  icon: ReactNode;
}>[] = [
  {
    value: 'View profile',
    path: '/user-profile',
    key: 'view',
  },
  {
    value: 'Edit profile',
    path: '/settings',
    key: 'edit',
  },
];

export const visiblePaths = [
  Path.HOME,
  Path.PROFILE,
  Path.HELP,
  Path.LISTS,
  Path.SETTINGS,
];
