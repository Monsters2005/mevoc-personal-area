/* eslint-disable */
import { merge } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { NotificationType } from '../../@types/entities/Notification';
import { User } from '../../@types/entities/User';
import { DashboardActiveLists } from '../../components/Dashboard/ActiveLists/ActiveLists';
import { DashboardDailyProgress } from '../../components/Dashboard/DailyProgress/DailyProgress';
import { DashboardGreeting } from '../../components/Dashboard/Greeting/Greeting';
import { DashboardWordPacks } from '../../components/Dashboard/WordPacks/WordPacks';
import SetUpModal from '../../components/Modals/SetUpModal/SetUpModal';
import { Button } from '../../components/UI/Button/Button';
import { Dropdown } from '../../components/UI/DropDown/Dropdown';
import { Option } from '../../components/UI/DropDown/types';
import { languages } from '../../constants/languages';
import { Path } from '../../constants/routes';
import { useActiveLists } from '../../context/ActiveLists';
import { useModal } from '../../context/ModalContext';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import { wordPack } from '../../mocks/pack';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { startBtn } from '../../shared/styles/button-variations';
import { useGetListsByUserIdQuery } from '../../store/api/listApi';
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from '../../store/api/userApi';
import s from './Dashboard.module.scss';
import translations from '../../components/Dashboard/Dashboard.i18n.json';
import notifTransl from '../../pages/Notifications.i18n.json';

export function DashboardPage() {
  const { data: user } = useGetCurrentUserQuery();
  const { data: userLists, refetch: refetchUserLists } =
    useGetListsByUserIdQuery(user?.id || 0);
  const { currentLists } = useActiveLists();
  const { setCurrentModal } = useModal();
  const [updateUser] = useUpdateUserMutation();

  const langOption =
    languages.find(item => item.name === user?.nativeLang) || languages[0];
  const [lang, setLang] = useState<Option | undefined>(langOption);

  const navigate = useNavigate();

  const handleListAdd = () => {
    navigate(`/${Path.LISTS}`);
  };

  const { t } = useLocalTranslation(merge(translations, notifTransl));

  const onFillData = async (data: Partial<User>) => {
    try {
      await updateUser({ ...data, id: user?.id });
      eventBus.emit(EventTypes.notification, {
        message: t('setUp'),
        title: t('allSet'),
        type: NotificationType.SUCCESS,
      });
    } catch {
      eventBus.emit(EventTypes.notification, {
        message: t('setUpFail'),
        title: t('error'),
        type: NotificationType.DANGER,
      });
    }
  };

  useEffect(() => {
    if (user) {
      const { lastName, location, nativeLang, learningLang } = user;
      if (!lastName || !location || !nativeLang || !learningLang) {
        setCurrentModal(<SetUpModal onFillData={onFillData} />);
      }
    }
  }, [user]);

  return (
    <div className={s.dashboardpage_container}>
      <div className={s.dashboardpage_header}>
        <div className={s.dashboardpage_greeting}>
          <DashboardGreeting name={user?.firstName || ''} />
        </div>
        <div className={s.dashboardpage_lang}>
          <Dropdown
            listTitle="Languages"
            options={languages}
            selectedItem={lang}
            setSelectedItem={(item: Option | undefined) => setLang(item)}
            allowNoneSelected={false}
            styles={{ width: '200px' }}
            listStyles={{ width: '300px', left: '-6.2rem' }}
          />
        </div>
      </div>
      <div className={s.dashboardpage_grid}>
        <div className={s.dashboardpage_row}>
          <DashboardActiveLists
            lists={userLists || null}
            onAddList={handleListAdd}
          />
          <DashboardDailyProgress />
        </div>
        <div className={s.dashboardpage_row}>
          <DashboardWordPacks packs={[wordPack]} />
          <Button
            type="primary"
            styles={startBtn}
            onClick={() => navigate(`/${Path.LEARNING}`)}
            disabled={!currentLists.find(el => el.words.length > 0)}
          >
            {t('startLearning')}
          </Button>
        </div>
      </div>
    </div>
  );
}
