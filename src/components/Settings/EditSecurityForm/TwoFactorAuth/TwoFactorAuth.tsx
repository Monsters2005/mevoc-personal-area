import React from 'react';
import { User } from '../../../../@types/entities/User';
import { SavableSection } from '../SavableSection/SavableSection';
import s from './TwoFactorAuth.module.scss';
import { TwoFactorItem } from './TwoFactorItem';
import { Option } from './types';

type Props = {
  options: Option[];
  user: User;
};

export function TwoFactorAuth({ user, options }: Props) {
  return (
    <SavableSection
      title="Two-factor authentication"
      onSave={() => console.log('save changes')}
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
    </SavableSection>
  );
}
