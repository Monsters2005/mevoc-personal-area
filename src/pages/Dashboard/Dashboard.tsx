import React, { useState } from 'react';
import { DashboardActiveLists } from '../../components/Dashboard/ActiveLists/ActiveLists';
import { DashboardDailyProgress } from '../../components/Dashboard/DailyProgress/DailyProgress';
import { DashboardGreeting } from '../../components/Dashboard/Greeting/Greeting';
import { DashboardWordPacks } from '../../components/Dashboard/WordPacks/WordPacks';
import { Sidebar } from '../../components/Sidebar/Sidebar/Sidebar';
import { Dropdown } from '../../components/UI/DropDown/Dropdown';
import { Option } from '../../components/UI/DropDown/types';
import { languages } from '../../constants/languages';
import useCurrentUser from '../../hooks/useCurrentUser';
import { list } from '../../mocks/list';
import { lists } from '../../mocks/lists';
import { wordPack } from '../../mocks/pack';
import s from './Dashboard.module.scss';

export function DashboardPage() {
  const user = useCurrentUser();

  const [lang, setLang] = useState<Option | null>(languages[0]);

  return (
    <div className={s.dashboardpage_container}>
      <div className={s.dashboardpage_header}>
        <div className={s.dashboardpage_greeting}>
          <DashboardGreeting name={user.firstName} />
        </div>
        <div className={s.dashboardpage_lang}>
          <Dropdown
            listTitle="Languages"
            options={languages}
            selectedItem={lang}
            setSelectedItem={(item: Option | null) => setLang(item)}
            allowNoneSelected={false}
            styles={{ width: '200px' }}
          />
        </div>
      </div>
      <div className={s.dashboardpage_grid}>
        <div className={s.dashboardpage_row}>
          <DashboardActiveLists
            lists={lists}
            onAddList={() => console.log('')}
          />
          <DashboardDailyProgress words={2} wordsLearned={1} />
        </div>
        <div className={s.dashboardpage_row}>
          <DashboardWordPacks packs={[wordPack]} />
        </div>
      </div>
    </div>
  );
}
