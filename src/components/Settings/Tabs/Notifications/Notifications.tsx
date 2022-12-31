import React from 'react';
import { notImplemented } from '../../../../constants/alerts';
import Alert from '../../../UI/Alert/Alert';
import { UISvgSelector } from '../../../UI/UISvgSelector';
import s from './Notifications.module.scss';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import common from '../../../UI/Common.i18n.json';

export function NotificationsTab() {
  const { t } = useLocalTranslation(common);

  return (
    <div className={s.notifications_container}>
      <Alert
        icon={<UISvgSelector id={notImplemented.icon} />}
        title={t(notImplemented.title)}
        text={t(notImplemented.text)}
      />
    </div>
  );
}
