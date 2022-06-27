import React from 'react';
import { User } from '../../../../@types/entities/User';
import { ChangePassword } from '../ChangePassword/ChangePassword';
import { TwoFactorAuth } from '../TwoFactorAuth/TwoFactorAuth';
import { Option } from '../TwoFactorAuth/types';
import s from './EditSecurityForm.module.scss';

type Props = {
  options: Option[];
  user: User;
};

export function EditSecurityForm({ options, user }: Props) {
  return (
    <div className={s.securityform_container}>
      <ChangePassword />
      <TwoFactorAuth user={user} options={options} />
    </div>
  );
}
