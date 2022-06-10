import React from 'react';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import { getMediaLink } from '../../../utils/getMediaLink';
import { LanguageField } from '../LanguageField/LanguageField';
import s from './Card.module.scss';
import defaultAvatar from '../../../assets/images/defaultAvatar.png';

type Props = {
  userData: {
    firstName: string;
    lastName: string;
    avatar: string;
    location: string;
    langNative: string;
    langLearning: string;
  };
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
  const avatarUrl = getMediaLink(avatar) || defaultAvatar;

  return (
    <div className={s.usercard_container}>
      <div className={s.usercard_avatar}>
        <img src={avatarUrl} alt="avatar" />
      </div>
      <div className={s.usercard_info}>
        <h4>{`${firstName} ${lastName}`}</h4>
        <p>
          <GlobalSvgSelector id="location" />
          {location}
        </p>

        <LanguageField label="Native Language" language={langNative} />
        <LanguageField label="Currently Learning" language={langLearning} />
      </div>
    </div>
  );
}
