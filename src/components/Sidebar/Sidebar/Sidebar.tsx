import React from 'react';
import s from './Sidebar.module.scss';

import { SidebarBottomBlock } from '../BottomBlock/BottomBlock';
import { SidebarNavigation } from '../Navigation/Navigation';
import { SidebarProfile } from '../Profile/Profile';
import { Logo } from '../../UI/Logo/Logo';

export function Sidebar() {
  const user = {
    firstName: 'Karina',
    lastName: 'Carmichael',
    username: 'perfechate',
    avatarUrl:
      'https://images.unsplash.com/photo-1518288774672-b94e808873ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=738&q=80',
  };

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
