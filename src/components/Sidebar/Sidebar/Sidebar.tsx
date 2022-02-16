import React from 'react';
import { SidebarBottomBlock } from '../BottomBlock/BottomBlock';
import { SidebarLogo } from '../Logo/Logo';
import { SidebarNavigation } from '../Navigation/Navigation';
import { SidebarProfile } from '../Profile/Profile';
import { Page, Pages } from './types';

type Props<T> = {
  pages: T;
  defaultActive: keyof T;
};

export function Sidebar<T extends Pages>({ pages, defaultActive }: Props<T>) {
  const sortedPages = Object.keys(pages).map(key => ({
    icon: pages[key].icon,
    name: pages[key].name,
    path: pages[key].path,
    key,
  }));

  return (
    <>
      <SidebarLogo />
      <SidebarProfile />
      <SidebarNavigation pages={sortedPages} defaultActive={defaultActive} />
      <SidebarBottomBlock />
    </>
  );
}
