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
import { ContentSkeleton } from '../../UI/ContentLoader/ContentLoader';
import { eventBus, EventTypes } from '../../../packages/EventBus';
import { CustomError } from '../../../@types/entities/ErrorObject';
import { NotificationType } from '../../../@types/entities/Notification';
import { useGetCurrentUserQuery } from '../../../store/api/userApi';

type Props<T> = {
  pages: T;
  actions: ActionItem[];
};

export function Sidebar<T extends Pages>({ pages, actions }: Props<T>) {
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUserQuery();
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
    } catch (e) {
      eventBus.emit(EventTypes.notification, {
        message: (e as CustomError).data.message,
        title: 'Failed to sign out',
        type: NotificationType.DANGER,
      });
    }
  };

  return (
    <div className={s.sidebar_container}>
      <div className={s.sidebar_content}>
        <Logo />
        {user ? (
          <SidebarProfile user={user} />
        ) : (
          <ContentSkeleton
            type="profile"
            width={400}
            height={50}
            bgColor="#4F4E60"
            fgColor="#7a798f"
            style={{ marginTop: '50px' }}
          />
        )}
        <SidebarNavigation pages={sortedPages} />
        <SidebarActionItems
          items={actions}
          onSignOut={handleSignOut}
          onGoToHelp={goToHelp}
        />
      </div>
    </div>
  );
}
