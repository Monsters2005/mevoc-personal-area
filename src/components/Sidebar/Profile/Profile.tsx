import React from 'react';
import { getMediaLink } from '../../../utils/getMediaLink';
import { SidebarSvgSelector } from '../SidebarSvgSelector';
import s from './Profile.module.scss';

type User = {
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
};

type Props = {
  user: User;
};

export function SidebarProfile({ user }: Props) {
  const avatarUrl = getMediaLink(user.avatar);

  return (
    <div className={s.profile_container}>
      <span className={s.profile_avatar}>
        <img src={avatarUrl} alt={`${user.username} profile`} />
      </span>
      <div className={s.profile_info}>
        <h5>{`${user.firstName} ${user.lastName}`}</h5>
        <p>
          @
          {user.username}
        </p>
      </div>
      <button className={s.profile_expand}>
        <SidebarSvgSelector id="expand" />
      </button>
    </div>
  );
}
