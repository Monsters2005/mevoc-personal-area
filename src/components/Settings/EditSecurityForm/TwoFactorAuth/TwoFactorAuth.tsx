import React from 'react';
import { User } from '../../../../@types/entities/User';
import { SettingsSection } from '../../Section/Section';
import s from './TwoFactorAuth.module.scss';
import { TwoFactorItem } from './TwoFactorItem';
import { Option } from './types';

type Props = {
  options: Option[];
  user: User;
};

export function TwoFactorAuth({ user, options }: Props) {
  return (
    <SettingsSection
      title="Two-factor authentication"
      onSave={() => console.log('save changes')}
      isSavable
    >
      <div className={s.auth_container}>
        {options.map((item: Option) => (
          <TwoFactorItem
            key={item.id}
            item={item}
            isSelected={
              user.settings.safety.twoFactAuth[
                item.name as keyof typeof user.settings.safety.twoFactAuth
              ]
            }
            onChange={() => console.log(`switch the option ${item.name}`)}
          />
        ))}
      </div>
    </SettingsSection>
  );
}
