import React from 'react';
import { User } from '../../../../@types/entities/User';
import { primaryMiddle } from '../../../../shared/styles/button-variations';
import { Button } from '../../../UI/Button/Button';
import { SettingsAvatarCard } from '../../EditProfileForm/AvatarCard/AvatarCard';
import { SettingsInputGroup } from '../../EditProfileForm/InputGroup/InputGroup';
import s from './Account.module.scss';

type Props = {
  user: User;
  onAvatarEdit: () => void;
  onAvatarDelete: () => void;
  onVerifyEmail: () => void;
  onDataSave: () => void;
};

export function SettingsAccountTab({
  user,
  onAvatarEdit,
  onAvatarDelete,
  onVerifyEmail,
  onDataSave,
}: Props) {
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
      <div className={s.account_button}>
        <Button
          styles={{ ...primaryMiddle, fontSize: '16px' }}
          type="primary"
          onClick={onDataSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
