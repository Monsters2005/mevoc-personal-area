import React from 'react';

import s from './AvatarCard.module.scss';
import defaultAvatar from '../../../../assets/images/defaultAvatar.png';
// import { getMediaLink } from '../../../../utils/getMediaLink';
import { Button } from '../../../UI/Button/Button';
import { getMediaLink } from '../../../../utils/components/getMediaLink';
import { SettingsSvgSelector } from '../../SettingsSvgSelector';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
// import { SettingsSvgSelector } from '../../SettingsSvgSelector';
import common from '../../../UI/Common.i18n.json';

type Props = {
  avatar: string | undefined;
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
  const avatarUrl = getMediaLink(avatar || '') || defaultAvatar;
  const { t } = useLocalTranslation(common);

  return (
    <div className={s.avatarcard_container}>
      <div className={s.avatarcard_image}>
        <img src={avatarUrl} alt={avatar} />
      </div>

      <div className={s.avatarcard_buttons}>
        <Button type="secondary" onClick={onDelete}>
          <SettingsSvgSelector id="delete" />
          {`${t('delete')} ${t('avatar')}`}
        </Button>
        <Button type="secondary" onClick={onEdit}>
          <SettingsSvgSelector id="edit" />
          {`${t('edit')} ${t('avatar')}`}
        </Button>
      </div>
    </div>
  );
}
