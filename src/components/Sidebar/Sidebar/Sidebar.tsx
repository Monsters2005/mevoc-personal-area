import React from 'react';
import s from './Sidebar.module.scss';

import { SidebarActionItems } from '../ActionItems/ActionsItems';
import { SidebarNavigation } from '../Navigation/Navigation';
import { SidebarProfile } from '../Profile/Profile';

import { Logo } from '../../UI/Logo/Logo';
import { user } from '../../../mocks/user';

import { ActionItem, Pages } from './types';

type Props<T> = {
  pages: T;
  defaultActive: keyof T;
  actions: ActionItem[];
};

export function Sidebar<T extends Pages>({
  pages,
  defaultActive,
  actions,
}: Props<T>) {
  const sortedPages = Object.keys(pages).map(key => ({
    icon: pages[key].icon,
    name: pages[key].name,
    path: pages[key].path,
    key,
  }));

  return (
    <div className={s.sidebar_container}>
      <div className={s.sidebar_content}>
        <Logo />
        <SidebarProfile user={user} />
        <SidebarNavigation pages={sortedPages} defaultActive={defaultActive} />
        <SidebarActionItems items={actions} />
      </div>
    </div>
  );
}
