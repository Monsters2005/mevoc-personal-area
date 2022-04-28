import React from 'react';
import { User } from '../../../../@types/entities/User';
import s from './NotificationGroup.module.scss';
import { NotificationGroupItem } from './NotificationGroupItem';
import { Option } from './types';

type Props = {
  title: string;
  user: User;
  options: Option[];
};

export function NotificationGroup({ user, title, options }: Props) {
  return (
    <div className={s.notfgroup_container}>
      <h3 className={s.notfgroup_title}>{title}</h3>
      <div className={s.notfgroup_content}>
        {options.map((item: Option) => (
          <NotificationGroupItem
            item={item}
            isSelected={
              // user.settings.notifications.
              false
            }
            onChange={() => console.log('whatever')}
          />
        ))}
      </div>
    </div>
  );
}
