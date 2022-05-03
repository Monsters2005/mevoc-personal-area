import React from 'react';
import { options } from '../../../../constants/two-auth';
import { user } from '../../../../mocks/user';
import { ChangePassword } from '../ChangePassword/ChangePassword';
import { TwoFactorAuth } from '../TwoFactorAuth/TwoFactorAuth';
import s from './EditSecurityForm.module.scss';

export function EditSecurityForm() {
  return (
    <div className={s.securityform_container}>
      <ChangePassword />
      <TwoFactorAuth user={user} options={options} />
    </div>
  );
}
