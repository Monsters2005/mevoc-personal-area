import React from 'react';
import { Graph } from '../../components/UI/Graph/Graph';
import { UserCard } from '../../components/User/Card/Card';
import { ListProgress } from '../../components/User/ListProgress/ListProgress';
import { UserListsProgress } from '../../components/User/ListsProgress/ListsProgress';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { lists } from '../../mocks/lists';
import { user } from '../../mocks/user';
import s from './UserProfile.module.scss';

export function UserProfilePage() {
  return (
    <PageLayout title="Lists management">
      <div className={s.profilepage_container}>
        <div className={s.profilepage_userinfo}>
          <UserCard userData={user} />
        </div>
        <div className={s.profilepage_listsinfo}>
          <div className={s.profilepage_graph} />
          <div className={s.profilepage_lists}>
            <UserListsProgress lists={lists} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
