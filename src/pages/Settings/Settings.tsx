import React, { useState } from 'react';
import { TabOption, Tabs } from '../../components/UI/Tabs/Tabs';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
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
    <PageLayout title="Settings">
      <div className={s.settingspage_container}>
        <div className={s.settingspage_header}>
          <Tabs
            options={settingsTabs}
            defaultActive={activeTab}
            onClick={it => console.log(it)}
          />
        </div>
        <div className={s.settingspage_content} />
      </div>
    </PageLayout>
  );
}
