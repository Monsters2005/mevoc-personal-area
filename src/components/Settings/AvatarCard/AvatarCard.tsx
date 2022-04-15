import React from 'react';
import { getMediaLink } from '../../../utils/getMediaLink';
import { Button } from '../../UI/Button/Button';

import s from './AvatarCard.module.scss';
import { SettingsSvgSelector } from './SettingsSvgSelector';

type Props = {
  avatar: string;
  onEdit: () => void;
  onDelete: () => void;
};

export function AvatarCard({ avatar, onEdit, onDelete }: Props) {
  const avatarUrl = getMediaLink(avatar);

  return (
    <div className={s.avatarcard_container}>
      <div className={s.avatarcard_image}>
        <img
          src={
            avatarUrl !== ' '
              ? avatarUrl
              : "https://i.ibb.co/FXPtHCX/profile-1.png'"
          }
          alt={avatar}
        />
      </div>

      <div className={s.avatarcard_buttons}>
        <Button type="secondary" onClick={onDelete}>
          <SettingsSvgSelector id="delete" />
          DeleteAvatar
        </Button>
        <Button type="secondary" onClick={onEdit}>
          <SettingsSvgSelector id="edit" />
          Edit avatar
        </Button>
      </div>
    </div>
  );
}
