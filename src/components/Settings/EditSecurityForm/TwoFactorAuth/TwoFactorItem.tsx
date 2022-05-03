import React from 'react';
import { Switch } from '../../../UI/Switch/Switch';
import s from './TwoFactorAuth.module.scss';
import { Option } from './types';

type Props = {
  item: Option;
  isSelected: boolean;
  onChange: () => void;
};

export function TwoFactorItem({ item, isSelected, onChange }: Props) {
  return (
    <div className={s.auth_item}>
      <div className={s.auth_item_content}>
        <h3>{item.label}</h3>
        <p>{item.description}</p>
      </div>
      <Switch
        defaultChecked={isSelected}
        onChange={onChange}
        name={item.name}
      />
    </div>
  );
}
