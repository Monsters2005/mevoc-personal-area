import React from 'react';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import { getMediaLink } from '../../../utils/getMediaLink';
import s from './Profile.module.scss';
import { User } from '../../../@types/entities/User';
import FallbackImgSelector from '../../../assets/FallbackImgSelector';

type Props = {
  user: Partial<User>;
};

export function SidebarProfile({
  user: {
    firstName, lastName, avatar, username,
  },
}: Props) {
  const avatarUrl = avatar && getMediaLink(avatar);

  return (
    <div className={s.profile_container}>
      <span className={s.profile_avatar}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={`${username} profile`} />
        ) : (
          <FallbackImgSelector id="user-avatar" />
        )}
      </span>
      <div className={s.profile_info}>
        <h5>{`${firstName} ${lastName || ''}`}</h5>
        <p>
          @
          {username}
        </p>
      </div>
      <button className={s.profile_expand}>
        <GlobalSvgSelector id="expand" />
      </button>
    </div>
  );
}
