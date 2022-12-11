import { ReactNode } from 'react';
import { ActionItem } from '../components/UI/ActionsDropdown/ActionsDropdown';
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
    key: 'signOut',
  },
  {
    label: 'Help',
    icon: 'question',
    key: 'help',
  },
];

export const profileActions: ActionItem[] = [
  {
    path: Path.PROFILE,
    key: 'viewProfile',
    func: () => null,
  },
  {
    path: Path.SETTINGS,
    key: 'editProfile',
    func: () => null,
  },
];

export const visiblePaths = [
  Path.HOME,
  Path.PROFILE,
  Path.HELP,
  Path.LISTS,
  Path.SETTINGS,
];
