import React from 'react';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import { getMediaLink } from '../../../utils/getMediaLink';
import { LanguageField } from '../LanguageField/LanguageField';
import s from './Card.module.scss';
import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import { User } from '../../../@types/entities/User';
import FallbackImgSelector from '../../../assets/FallbackImgSelector';

type Props = {
  userData: Partial<User>;
};

export function UserCard({
  userData: {
    firstName,
    lastName,
    avatar,
    location,
    langLearning,
    langNative,
  },
}: Props) {
  const avatarUrl = avatar && getMediaLink(avatar);

  return (
    <div className={s.usercard_container}>
      {}
      <div className={s.usercard_avatar}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={`${firstName} profile`} />
        ) : (
          <FallbackImgSelector id="user-avatar" />
        )}
      </div>
      <div className={s.usercard_info}>
        <h4>{`${firstName} ${lastName || ''}`}</h4>
        <p>
          <GlobalSvgSelector id="location" />
          {location || 'Hidden'}
        </p>

        <LanguageField
          label="Native Language"
          language={langNative || 'English'}
        />
        <LanguageField
          label="Currently Learning"
          language={langLearning || 'English'}
        />
      </div>
    </div>
  );
}
