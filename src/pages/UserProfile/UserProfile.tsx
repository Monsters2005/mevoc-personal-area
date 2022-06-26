import React, { useState } from 'react';
import { List } from '../../@types/entities/List';
import { Graph } from '../../components/UI/Graph/Graph';
import { UserCard } from '../../components/User/Card/Card';
import { UserListsProgress } from '../../components/User/ListsProgress/ListsProgress';
import { Statistics } from '../../components/User/Statistics/Statistics';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { lists } from '../../mocks/lists';
import { user } from '../../mocks/user';
import s from './UserProfile.module.scss';

export function UserProfilePage() {
  const [activeList, setActiveList] = useState<List>(lists[0]);

  return (
    <PageLayout title="Lists management">
      <div className={s.profilepage_container}>
        <div className={s.profilepage_userinfo}>
          <UserCard userData={user} />
        </div>
        <div className={s.profilepage_listsinfo}>
          <div className={s.profilepage_graph}>
            <Statistics list={activeList} />
          </div>
          <div className={s.profilepage_lists}>
            <UserListsProgress
              lists={lists}
              active={activeList}
              setActive={(list: List) => setActiveList(list)}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
