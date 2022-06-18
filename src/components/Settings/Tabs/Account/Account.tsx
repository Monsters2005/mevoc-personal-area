import React from 'react';
import { User } from '../../../../@types/entities/User';
import { Button } from '../../../UI/Button/Button';
import { AvatarCard } from '../../EditProfileForm/AvatarCard/AvatarCard';
import s from './Account.module.scss';

type Props = {
  user: User;
  onAvatarEdit: () => void;
  onAvatarDelete: () => void;
  onDataSave: () => void;
};

export function AccountTab({
  user,
  onAvatarEdit,
  onAvatarDelete,
  onDataSave,
}: Props) {
  return (
    <div className={s.account_container}>
      <div className={s.account_avatar}>
        <AvatarCard
          avatar={user.avatar}
          onEdit={onAvatarEdit}
          onDelete={onAvatarDelete}
        />
      </div>
      <div className={s.account_fields}>{}</div>
      <Button type="primary" onClick={onDataSave}>
        Save
      </Button>
    </div>
  );
}
