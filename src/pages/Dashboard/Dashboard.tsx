import React, { useState } from 'react';
import { User } from '../../@types/entities/User';
import { DashboardActiveLists } from '../../components/Dashboard/ActiveLists/ActiveLists';
import { DashboardDailyProgress } from '../../components/Dashboard/DailyProgress/DailyProgress';
import { DashboardGreeting } from '../../components/Dashboard/Greeting/Greeting';
import { DashboardWordPacks } from '../../components/Dashboard/WordPacks/WordPacks';
import { Dropdown } from '../../components/UI/DropDown/Dropdown';
import { Option } from '../../components/UI/DropDown/types';
import { languages } from '../../constants/languages';
import { PrivateLayout } from '../../layouts/PrivateLayout/PrivateLayout';
import { wordPack } from '../../mocks/pack';
import s from './Dashboard.module.scss';

type Props = {
  user: User | undefined;
};

export function DashboardPage({ user }: Props) {
  const langOption = languages.find(item => item.name === user?.langNative) || languages[0];
  const [lang, setLang] = useState<Option | undefined>(langOption);

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
            lists={user?.lists || null}
            onAddList={() => console.log('')}
          />
          <DashboardDailyProgress words={2} wordsLearned={0} />
        </div>
        <div className={s.dashboardpage_row}>
          <DashboardWordPacks packs={[wordPack]} />
        </div>
      </div>
    </div>
  );
}
