import React from 'react';
import { SavableSection } from '../SavableSection/SavableSection';
import s from './ChangePassword.module.scss';

export function ChangePassword() {
  return (
    <SavableSection
      title="Change your password"
      onSave={() => console.log('change password')}
    >
      <div className={s.changepassword_container} />
    </SavableSection>
  );
}
