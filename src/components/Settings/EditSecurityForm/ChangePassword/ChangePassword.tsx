import React from 'react';
import { SettingsSection } from '../../Section/Section';
import s from './ChangePassword.module.scss';

export function ChangePassword() {
  return (
    <SettingsSection
      title="Change your password"
      isSavable
      onSave={() => console.log('change password')}
    >
      <div className={s.changepassword_container} />
    </SettingsSection>
  );
}
