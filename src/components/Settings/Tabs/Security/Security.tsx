import React from 'react';
import { notImplemented } from '../../../../constants/alerts';
import Alert from '../../../UI/Alert/Alert';
import { UISvgSelector } from '../../../UI/UISvgSelector';
import s from './Security.module.scss';

export function SecurityTab() {
  return (
    <div className={s.security_container}>
      <Alert
        icon={<UISvgSelector id={notImplemented.icon} />}
        title={notImplemented.title}
        text={notImplemented.text}
      />
    </div>
  );
}
