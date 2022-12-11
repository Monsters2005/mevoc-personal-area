import React from 'react';
import { notImplemented } from '../../../../constants/alerts';
import Alert from '../../../UI/Alert/Alert';
import { UISvgSelector } from '../../../UI/UISvgSelector';
import s from './Notifications.module.scss';

export function NotificationsTab() {
  return (
    <div className={s.notifications_container}>
      <Alert
        icon={<UISvgSelector id={notImplemented.icon} />}
        title={notImplemented.title}
        text={notImplemented.text}
      />
    </div>
  );
}
