import React from 'react';
import { SidebarBottomBlock } from '../BottomBlock/BottomBlock';
import { SidebarLogo } from '../Logo/Logo';
import { SidebarNavigation } from '../Navigation/Navigation';
import { SidebarProfile } from '../Profile/Profile';

export function Sidebar() {
  const pages = [
    {
      icon: 'house',
      name: 'Dashboard',
      path: 'dashboard',
      id: 1,
    },
    {
      icon: 'list',
      name: 'Lists Management',
      path: 'lists-management',
      id: 2,
    },
    {
      icon: 'user',
      name: 'User Profile',
      path: 'user-profile',
      id: 3,
    },
    {
      icon: 'settings',
      name: 'Settings',
      path: 'settings',
      id: 4,
    },
  ];

  return (
    <>
      <SidebarLogo />
      <SidebarProfile />
      <SidebarNavigation pages={pages} />
      <SidebarBottomBlock />
    </>
  );
}
