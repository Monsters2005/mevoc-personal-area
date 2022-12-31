import React from 'react';
import { notImplemented } from '../../../../constants/alerts';
import Alert from '../../../UI/Alert/Alert';
import { UISvgSelector } from '../../../UI/UISvgSelector';
import s from './Security.module.scss';
import common from '../../../UI/Common.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';

export function SecurityTab() {
  const { t } = useLocalTranslation(common);

  return (
    <div className={s.security_container}>
      <Alert
        icon={<UISvgSelector id={notImplemented.icon} />}
        title={t(notImplemented.title)}
        text={t(notImplemented.text)}
      />
    </div>
  );
}
