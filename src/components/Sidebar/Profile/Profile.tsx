import React from 'react';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import { getMediaLink } from '../../../utils/getMediaLink';
import s from './Profile.module.scss';

type User = {
  firstName: string;
  lastName: string;
  username: string;
  avatar: string | null;
};

type Props = {
  user: User;
};

export function SidebarProfile({
  user: {
    firstName, lastName, avatar, username,
  },
}: Props) {
  const avatarUrl = getMediaLink(avatar);

  return (
    <div className={s.profile_container}>
      <span className={s.profile_avatar}>
        <img
          src={
            avatarUrl !== ' '
              ? avatarUrl
              : "https://i.ibb.co/FXPtHCX/profile-1.png'"
          }
          alt={`${username} profile`}
        />
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
