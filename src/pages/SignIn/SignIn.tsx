import { ExecException } from 'child_process';
import React, { ErrorInfo } from 'react';
import { useNavigate } from 'react-router';
import { Exception } from 'sass';
import { SignInDto } from '../../@types/dto/auth/signin.dto';
import { Tokens } from '../../@types/dto/auth/tokens.dto';
import { CustomError } from '../../@types/entities/ErrorObject';
import { NotificationType } from '../../@types/entities/Notification';
import { SignInForm } from '../../components/Auth/SignInForm/SignInForm';
import { SUCCESS_LOGIN } from '../../constants/notificationMessages';
import { AuthLayout } from '../../layouts/AuthLayout/AuthLayout';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { useSigninMutation } from '../../store/api/authApi';
import s from './SignIn.module.scss';
import notifTransl from '../Notifications.i18n.json';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';

export function SignInPage() {
  const navigate = useNavigate();
  const [signIn] = useSigninMutation();
  const goToDashboard = () => navigate('/dashboard');
  const { t } = useLocalTranslation(notifTransl);

  const login = async (data: SignInDto) => {
    const dataObj: SignInDto = {
      email: data.email,
      password: data.password,
    };

    try {
      await signIn(dataObj)
        .unwrap()
        .then((result: unknown) => {
          const tokens = result as Tokens;
          window.localStorage.setItem('accessToken', tokens.accessToken);
        });
      eventBus.emit(EventTypes.notification, {
        message: SUCCESS_LOGIN,
        title: t('success'),
        type: NotificationType.SUCCESS,
      });

      goToDashboard();
    } catch (e: unknown) {
      eventBus.emit(EventTypes.notification, {
        message: (e as CustomError).data.message,
        title: t('error'),
        type: NotificationType.DANGER,
      });
    }
  };

  return (
    <AuthLayout>
      <div className={s.signin_container}>
        <SignInForm
          onSubmit={(data: SignInDto) => login(data)}
          onLink={() => navigate('/signup')}
        />
      </div>
    </AuthLayout>
  );
}
