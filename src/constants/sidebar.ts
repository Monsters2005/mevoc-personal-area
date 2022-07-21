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
];

export const visiblePaths = [
  Path.HOME,
  Path.USER,
  Path.HELP,
  Path.LISTS,
  Path.SETTINGS,
];
