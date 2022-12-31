import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { List } from '../../@types/entities/List';
import { User } from '../../@types/entities/User';
import { ContentSkeleton } from '../../components/UI/ContentLoader/ContentLoader';
import { UserCard } from '../../components/User/Card/Card';
import { UserListsProgress } from '../../components/User/ListsProgress/ListsProgress';
import { Statistics } from '../../components/User/Statistics/Statistics';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { lists } from '../../mocks/lists';
import { useGetListsByUserIdQuery } from '../../store/api/listApi';
import { useGetCurrentUserQuery } from '../../store/api/userApi';
import s from './UserProfile.module.scss';
import sidebar from '../../components/Sidebar/Sidebar/Sidebar.i18n.json';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';

export function UserProfilePage() {
  const { data: user } = useGetCurrentUserQuery();

  const { data: userLists = [] } = useGetListsByUserIdQuery(user?.id || 0, {
    skip: !user?.id,
  });
  const [activeList, setActiveList] = useState<List>(userLists[0]);
  const { t } = useLocalTranslation(sidebar);
  const isSmallScreen = useMediaQuery({ maxWidth: '1900px' });

  return (
    <PageLayout
      styles={{ height: isSmallScreen ? 'fit-content' : '95vh' }}
      title={t('userProfile')}
    >
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
              <Statistics list={activeList} />
            </div>
          </div>
          <div className={s.profilepage_lists}>
            {userLists ? (
              <UserListsProgress
                lists={userLists}
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
