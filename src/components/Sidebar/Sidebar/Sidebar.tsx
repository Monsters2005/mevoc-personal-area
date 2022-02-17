import React from 'react';
import s from './Sidebar.module.scss';

import { SidebarBottomBlock } from '../BottomBlock/BottomBlock';
import { SidebarNavigation } from '../Navigation/Navigation';
import { SidebarProfile } from '../Profile/Profile';
import { Logo } from '../../UI/Logo/Logo';
import { user } from '../../../mocks/user';

export function Sidebar() {
  return (
    <div className={s.sidebar_container}>
      <div className={s.sidebar_content}>
        <Logo />
        <SidebarProfile user={user} />
        <SidebarNavigation />
        <SidebarBottomBlock />
      </div>
    </div>
  );
}
