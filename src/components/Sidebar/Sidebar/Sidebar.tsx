import React from 'react';
import { SidebarBottomBlock } from '../BottomBlock/BottomBlock';
import { SidebarLogo } from '../Logo/Logo';
import { SidebarNavigation } from '../Navigation/Navigation';
import { SidebarProfile } from '../Profile/Profile';

export function Sidebar() {
  return (
    <>
      <SidebarLogo />
      <SidebarProfile />
      <SidebarNavigation />
      <SidebarBottomBlock />
    </>
  );
}
