import React from 'react';
import { useNavigate } from 'react-router';
import ContentLoader from 'react-content-loader';
import { SidebarActionItems } from '../ActionItems/ActionsItems';
import { SidebarNavigation } from '../Navigation/Navigation';
import { SidebarProfile } from '../Profile/Profile';

import { Logo } from '../../UI/Logo/Logo';

import { ActionItem, Pages } from './types';
import { User } from '../../../@types/entities/User';
import { useSignoutMutation } from '../../../store/api/authApi';
import { Path } from '../../../constants/routes';
import s from './Sidebar.module.scss';

type Props<T> = {
  pages: T;
  defaultActive: keyof T;
  actions: ActionItem[];
  user: User | undefined;
};

export function Sidebar<T extends Pages>({
  pages,
  defaultActive,
  actions,
  user,
}: Props<T>) {
  const navigate = useNavigate();
  const sortedPages = Object.keys(pages).map(key => ({
    icon: pages[key].icon,
    name: pages[key].name,
    path: pages[key].path,
    key,
  }));
  const [signOut] = useSignoutMutation();
  const goToHelp = () => navigate(Path.HELP);
  const handleSignOut = () => {
    try {
      signOut();
      localStorage.removeItem('accessToken');
    } catch {
      // event bus notification
    }
  };

  return (
    <div className={s.sidebar_container}>
      <div className={s.sidebar_content}>
        <Logo />
        {user ? (
          <SidebarProfile user={user} />
        ) : (
          <ContentLoader
            speed={2}
            width={400}
            height={50}
            viewBox="0 0 400 50"
            backgroundColor="#4F4E60"
            foregroundColor="#7a798f"
            style={{ marginTop: '50px' }}
          >
            <rect x="59" y="12" rx="3" ry="3" width="200" height="8" />
            <rect x="59" y="30" rx="3" ry="3" width="82" height="7" />
            <circle cx="25" cy="25" r="25" />
          </ContentLoader>
        )}
        <SidebarNavigation pages={sortedPages} defaultActive={defaultActive} />
        <SidebarActionItems
          items={actions}
          onSignOut={handleSignOut}
          onGoToHelp={goToHelp}
        />
      </div>
    </div>
  );
}
