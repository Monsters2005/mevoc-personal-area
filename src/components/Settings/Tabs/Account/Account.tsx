import React from 'react';
import { SettignsProfileFormDto } from '../../../../@types/dto/settings/profileform.dto';
import { NotificationType } from '../../../../@types/entities/Notification';
import { User } from '../../../../@types/entities/User';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { eventBus, EventTypes } from '../../../../packages/EventBus';
import { primaryMiddle } from '../../../../shared/styles/button-variations';
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from '../../../../store/api/userApi';
import { Button } from '../../../UI/Button/Button';
import { SettingsAvatarCard } from '../../EditProfileForm/AvatarCard/AvatarCard';
import { SettingsInputGroup } from '../../EditProfileForm/InputGroup/InputGroup';
import s from './Account.module.scss';
import translations from '../../../../pages/Notifications.i18n.json';

export function AccountTab() {
  const { data: user, refetch: refetchUserData } = useGetCurrentUserQuery();
  const [updateUser] = useUpdateUserMutation();
  const { t } = useLocalTranslation(translations);

  // TODO: User should be received from the context which will have a data about current user
  // TODO: signed in
  // TODO: Add logic to all functions below
  const onAvatarEdit = () => console.log();
  const onAvatarDelete = () => console.log();
  const onVerifyEmail = () => console.log();
  //! Save function should be common, not local
  const onDataSave = async (data: SettignsProfileFormDto) => {
    try {
      await updateUser({ ...data, id: user?.id });
      eventBus.emit(EventTypes.notification, {
        message: t('accountInfoUpdate'),
        title: t('success'),
        type: NotificationType.SUCCESS,
      });
      refetchUserData();
    } catch (e) {
      eventBus.emit(EventTypes.notification, {
        message: t('error'),
        title: t('accountInfoUpdateFail'),
        type: NotificationType.DANGER,
      });
    }
  };

  const onAvatarSave = () => console.log();

  return (
    <div className={s.account_container}>
      <div className={s.account_avatar}>
        <SettingsAvatarCard
          avatar={user?.avatar}
          onEdit={onAvatarEdit}
          onDelete={onAvatarDelete}
          onSave={onAvatarSave}
        />
      </div>
      <div className={s.account_fields}>
        <div className="settings-connect">
          {user && (
            <SettingsInputGroup
              user={user}
              onSave={onDataSave}
              onVerifyEmail={onVerifyEmail}
            />
          )}
        </div>
      </div>
    </div>
  );
}
