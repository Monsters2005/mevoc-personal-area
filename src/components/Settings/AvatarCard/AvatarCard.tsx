import React from 'react';
import { getMediaLink } from '../../../utils/getMediaLink';
import { Button } from '../../UI/Button/Button';

import s from './AvatarCard.module.scss';
import { SettingsSvgSelector } from './SettingsSvgSelector';
import defaultAvatar from '../../../assets/images/defaultAvatar.png';

type Props = {
  avatar: string;
  onEdit: () => void;
  onDelete: () => void;
};

export function AvatarCard({ avatar, onEdit, onDelete }: Props) {
  const avatarUrl = getMediaLink(avatar) || defaultAvatar;

  return (
    <div className={s.avatarcard_container}>
      <div className={s.avatarcard_image}>
        <img src={avatarUrl} alt={avatar} />
      </div>

      <div className={s.avatarcard_buttons}>
        <Button type="secondary" onClick={onDelete}>
          <SettingsSvgSelector id="delete" />
          Delete Avatar
        </Button>
        <Button type="secondary" onClick={onEdit}>
          <SettingsSvgSelector id="edit" />
          Edit avatar
        </Button>
      </div>
    </div>
  );
}
