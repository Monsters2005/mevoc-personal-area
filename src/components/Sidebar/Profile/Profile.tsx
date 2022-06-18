import React from 'react';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import { getMediaLink } from '../../../utils/components/getMediaLink';
import s from './Profile.module.scss';
import defaultAvatar from '../../../assets/images/defaultAvatar.png';

type User = {
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
};

type Props = {
  user: User;
};

export function SidebarProfile({
  user: {
    firstName, lastName, avatar, username,
  },
}: Props) {
  const avatarUrl = getMediaLink(avatar) || defaultAvatar;

  return (
    <div className={s.profile_container}>
      <span className={s.profile_avatar}>
        <img src={avatarUrl} alt={`${username} profile`} />
      </span>
      <div className={s.profile_info}>
        <h5>{`${firstName} ${lastName}`}</h5>
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
