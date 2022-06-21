import React from 'react';
import { User } from '../../../../@types/entities/User';
import { user } from '../../../../mocks/user';
import { primaryMiddle } from '../../../../shared/styles/button-variations';
import { Button } from '../../../UI/Button/Button';
import { SettingsAvatarCard } from '../../EditProfileForm/AvatarCard/AvatarCard';
import { SettingsInputGroup } from '../../EditProfileForm/InputGroup/InputGroup';
import s from './Account.module.scss';

export function AccountTab() {
  // TODO: User should be received from the context which will have a data about current user signed in
  // TODO: Add logic to all functions below
  const onAvatarEdit = () => console.log();
  const onAvatarDelete = () => console.log();
  const onVerifyEmail = () => console.log();
  //! Save function should be common, not local
  const onDataSave = () => console.log();

  return (
    <div className={s.account_container}>
      <div className={s.account_avatar}>
        <SettingsAvatarCard
          avatar={user.avatar}
          onEdit={onAvatarEdit}
          onDelete={onAvatarDelete}
          onSave={onDataSave}
        />
      </div>
      <div className={s.account_fields}>
        <div className="settings-connect">
          <SettingsInputGroup
            user={user}
            onSave={onDataSave}
            onVerifyEmail={onVerifyEmail}
          />
        </div>
      </div>
    </div>
  );
}
