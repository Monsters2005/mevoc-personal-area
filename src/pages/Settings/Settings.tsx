import React, { useState } from 'react';
import { merge } from 'lodash';
import SettingsTab from '../../components/Settings/Tabs/Tab/SettingsTab';
import { TabOption, Tabs } from '../../components/UI/Tabs/Tabs';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import s from './Settings.module.scss';
import sidebar from '../../components/Sidebar/Sidebar/Sidebar.i18n.json';
import settings from './Settings.i18n.json';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const { t } = useLocalTranslation(merge(sidebar, settings));

  const settingsTabs = {
    account: {
      value: t('account'),
    },
    appearance: {
      value: t('appearance'),
    },
    notifications: {
      value: t('notifications'),
    },
    security: {
      value: t('security'),
    },
  };
  const handleTabChange = (tab: TabOption) => {
    if (tab.label) setActiveTab(tab.label);
  };

  return (
    <PageLayout title={t('settings')} styles={{ height: 'fit-content' }}>
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
