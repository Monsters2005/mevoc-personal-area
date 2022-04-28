import React from 'react';
import { Option } from './types';
import s from './NotificationGroup.module.scss';
import { Switch } from '../../../UI/Switch/Switch';

type Props = {
  item: Option;
  // isSelected: boolean;
  onChange: () => void;
};

export function NotificationGroupItem({ item, onChange }: Props) {
  return (
    <div className={s.notfgroup_item}>
      <p>{item.value}</p>
      <Switch
        // defaultChecked={isSelected}
        onChange={onChange}
        name={item.name}
      />
    </div>
  );
}
