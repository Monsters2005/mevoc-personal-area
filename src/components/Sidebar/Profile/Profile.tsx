import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import { getMediaLink } from '../../../utils/components/getMediaLink';
import s from './Profile.module.scss';
import { User } from '../../../@types/entities/User';
import FallbackImgSelector from '../../../assets/FallbackImgSelector';
import { Button } from '../../UI/Button/Button';
import ActionsDropdown, {
  DropdownItem,
} from '../../UI/ActionsDropdown/ActionsDropdown';
import { profileActions } from '../../../constants/sidebar';
import { useOutsideCheck } from '../../../hooks/useOutsideCheck';
import { ActionItem } from '../Sidebar/types';

type Props = {
  user: Partial<User>;
};

export function SidebarProfile({
  user: {
    firstName, lastName, avatar, username,
  },
}: Props) {
  const avatarUrl = avatar && getMediaLink(avatar);
  const [expandOpen, setExpandOpen] = useState(false);

  const navigate = useNavigate();

  const actionItems = profileActions.map(item => {
    item.func = () => navigate(item.path || '');
    return item;
  });

  const menuRef = useRef(null);

  useOutsideCheck(menuRef, () => {
    setExpandOpen(false);
  });

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
      <Button
        ref={menuRef}
        styles={{ marginLeft: 'auto' }}
        type="small"
        onClick={() => setExpandOpen(state => !state)}
      >
        <GlobalSvgSelector id="expand" />
      </Button>
      <div
        className={s.profile_actions}
        ref={menuRef}
        style={{ zIndex: expandOpen ? 1000 : -1000 }}
      >
        <ActionsDropdown isOpen={expandOpen} items={actionItems} />
      </div>
    </div>
  );
}
