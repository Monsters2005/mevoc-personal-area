import React, { useState } from 'react';
import { SettingsAccountTab } from '../../components/Settings/Tabs/Account/Account';
import { TabOption, Tabs } from '../../components/UI/Tabs/Tabs';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { user } from '../../mocks/user';
import s from './Settings.module.scss';

const settingsTabs = {
  account: {
    value: 'Account',
  },
  appearance: {
    value: 'Appearance',
  },
  notifications: {
    value: 'Notifications',
  },
  security: {
    value: 'Security',
  },
};

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <PageLayout title="Settings" styles={{ height: '1100px' }}>
      <div className={s.settingspage_container}>
        <div className={s.settingspage_header}>
          <Tabs
            options={settingsTabs}
            defaultActive={activeTab}
            onClick={it => console.log(it)}
          />
        </div>
        <div className={s.settingspage_content}>
          <SettingsAccountTab
            user={user}
            onAvatarEdit={() => console.log('')}
            onAvatarDelete={() => console.log('')}
            onVerifyEmail={() => console.log('')}
            onDataSave={() => console.log('')}
          />
        </div>
      </div>
    </PageLayout>
  );
}
