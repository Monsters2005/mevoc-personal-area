import React, { useState } from 'react';
import { List } from '../../@types/entities/List';
import { User } from '../../@types/entities/User';
import { ContentSkeleton } from '../../components/UI/ContentLoader/ContentLoader';
import { UserCard } from '../../components/User/Card/Card';
import { UserListsProgress } from '../../components/User/ListsProgress/ListsProgress';
import { Statistics } from '../../components/User/Statistics/Statistics';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { lists } from '../../mocks/lists';
import s from './UserProfile.module.scss';

type Props = {
  user: User | undefined;
};

export function UserProfilePage({ user }: Props) {
  const [activeList, setActiveList] = useState<List | undefined>(
    user?.lists && user.lists[0]
  );

  return (
    <PageLayout title="User Profle">
      <div className={s.profilepage_container}>
        <div className={s.profilepage_userinfo}>
          {user ? (
            <UserCard userData={user} />
          ) : (
            <ContentSkeleton
              type="area"
              width={350}
              height={560}
              bgColor="#4F4E60"
              fgColor="#7a798f"
            />
          )}
        </div>
        <div className={s.profilepage_listsinfo}>
          <div className={s.profilepage_graph}>
            <div className="stats-connect">
              {activeList ? (
                <Statistics list={activeList} />
              ) : (
                <ContentSkeleton
                  type="area"
                  width={670}
                  height={400}
                  bgColor="#4F4E60"
                  fgColor="#7a798f"
                  style={{
                    marginTop: '-25px',
                  }}
                />
              )}
            </div>
          </div>
          <div className={s.profilepage_lists}>
            {activeList ? (
              <UserListsProgress
                lists={lists}
                active={activeList}
                setActive={(list: List) => setActiveList(list)}
              />
            ) : (
              <ContentSkeleton
                type="area"
                width={1018}
                height={135}
                bgColor="#4F4E60"
                fgColor="#7a798f"
                style={{
                  marginTop: '-25px',
                }}
              />
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
