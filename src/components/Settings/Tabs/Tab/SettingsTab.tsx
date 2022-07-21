import React from 'react';
import { AccountTab } from '../Account/Account';
import AppearanceTab from '../Appearance/Appearance';
import { NotificationsTab } from '../Notifications/Notifications';
import { SecurityTab } from '../Security/Security';

type Props = { tab: string };

export default function SettingsTab({ tab }: Props) {
  switch (tab) {
    case 'account':
      return <AccountTab />;
    case 'appearance':
      return <AppearanceTab />;
    case 'notifications':
      return <NotificationsTab />;
    case 'security':
      return <SecurityTab />;
    default:
      return null;
  }
}
