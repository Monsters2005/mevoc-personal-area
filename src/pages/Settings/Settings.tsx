import React, { useState } from 'react';
import SettingsTab from '../../components/Settings/Tabs/Tab/SettingsTab';
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

  const handleTabChange = (tab: TabOption) => {
    if (tab.label) setActiveTab(tab.label);
  };

  return (
    <PageLayout title="Settings" styles={{ height: 'fit-content' }}>
      <div className={s.settingspage_container}>
        <div className={s.settingspage_header}>
          <Tabs
            options={settingsTabs}
            defaultActive={activeTab}
            onClick={tab => handleTabChange(tab)}
          />
        </div>
        <div className={s.settingspage_content}>
          <SettingsTab tab={activeTab} />
        </div>
      </div>
    </PageLayout>
  );
}
