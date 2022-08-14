import React from 'react';

import s from './AvatarCard.module.scss';
import defaultAvatar from '../../../../assets/images/defaultAvatar.png';
// import { getMediaLink } from '../../../../utils/getMediaLink';
import { Button } from '../../../UI/Button/Button';
import { getMediaLink } from '../../../../utils/components/getMediaLink';
// import { SettingsSvgSelector } from '../../SettingsSvgSelector';

type Props = {
  avatar: string;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
};

export function SettingsAvatarCard({
  avatar,
  onEdit,
  onDelete,
  onSave,
}: Props) {
  const avatarUrl = getMediaLink(avatar) || defaultAvatar;

  return (
    <div className={s.avatarcard_container}>
      <div className={s.avatarcard_image}>
        <img src={avatarUrl} alt={avatar} />
      </div>

      <div className={s.avatarcard_buttons}>
        <Button type="secondary" onClick={onDelete}>
          {/* <SettingsSvgSelector id="delete" /> */}
          Delete Avatar
        </Button>
        <Button type="secondary" onClick={onEdit}>
          {/* <SettingsSvgSelector id="edit" /> */}
          Edit avatar
        </Button>
      </div>
    </div>
  );
}
