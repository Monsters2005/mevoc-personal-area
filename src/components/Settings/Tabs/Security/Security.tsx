/* eslint-disable */
import React, { FormEventHandler, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { notImplemented } from '../../../../constants/alerts';
import Alert from '../../../UI/Alert/Alert';
import { UISvgSelector } from '../../../UI/UISvgSelector';
import s from './Security.module.scss';
import common from '../../../UI/Common.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { Switch } from '../../../UI/Switch/Switch';
import { useMfaQRMutation } from '../../../../store/api/authApi';
import { EventTypes, eventBus } from '../../../../packages/EventBus';
import settings from '../../../../pages/Settings/Settings.i18n.json';
import { NotificationType } from '../../../../@types/entities/Notification';
import { TransitionWrapper } from '../../../../layouts/Transition/Transition';
import { Button } from '../../../UI/Button/Button';
import { Input } from '../../../UI/Input/Input';
import {
  useGetCurrentUserQuery,
  useToggleMfaMutation,
} from '../../../../store/api/userApi';

export function SecurityTab() {
  const { data: user } = useGetCurrentUserQuery();
  const [setQrCode] = useMfaQRMutation();
  const [toggleMfa] = useToggleMfaMutation();
  const [qrCode, setQrCodeUrl] = useState<null | string>(null);
  const { t } = useLocalTranslation(settings);
  const [code, setCode] = useState('');

  const handleChangeAuth = () => {
    setQrCode().then(
      (
        value:
          | { data: { url: string } }
          | { error: FetchBaseQueryError | SerializedError }
      ) => {
        if ('data' in value && 'url' in value.data) {
          setQrCodeUrl(value?.data?.url || '');
        } else {
          eventBus.emit(EventTypes.notification, {
            message: t('errorQRCodeBody'),
            title: t('errorQRCodeTitle'),
            type: NotificationType.DANGER,
          });
        }
      }
    );
  };

  return (
    <div className={s.security_container}>
      <div className={s.security_sections}>
        <div className={s.security_section}>
          <h3 className={s.security_title}>{t('authTwoAuthTitle')}</h3>
          <div className={s.security_content}>
            <h4>{t('authTitle')}</h4>
            <div className={s.security_row}>
              <p>{t('authTFBody')}</p>
              {user?.mfa && !qrCode ? null : (
                <Button
                  type="secondary"
                  styles={{ padding: '8px 14px', textTransform: 'capitalize' }}
                  onClick={handleChangeAuth}
                >
                  Enable
                </Button>
              )}
            </div>
            <TransitionWrapper inState={!!user?.mfa || !!qrCode}>
              <div className={s.security_qr_container}>
                {!qrCode ? null : (
                  <div className={s.security_qr}>
                    <img src={qrCode || ''} alt="auth-qrcode" />
                    <div className={s.security_qr_column}>
                      <h4>{t('qrAddTitle')}</h4>
                      <p>{t('qrAddBody')}</p>
                    </div>
                  </div>
                )}
                <div className={s.security_qr_input}>
                  <Input
                    label="Confirm with the code"
                    name="code"
                    onChange={e => setCode(e.currentTarget.value)}
                  />
                  <Button
                    styles={{
                      padding: '8px 14px',
                      textTransform: 'capitalize',
                      fontWeight: '600',
                    }}
                    // eslint-disable-next-line
                    onClick={() =>
                      toggleMfa({
                        code,
                      })
                    }
                    type="primary"
                  >
                    {user?.mfa ? 'Disable' : 'Enable'}
                  </Button>
                </div>
              </div>
            </TransitionWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
