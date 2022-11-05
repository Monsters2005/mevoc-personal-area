import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { SignUpDto } from '../../@types/dto/auth/signup.dto';
import { CustomError } from '../../@types/entities/ErrorObject';
import { NotificationType } from '../../@types/entities/Notification';
import { SignUpForm } from '../../components/Auth/SignUpForm/SignUpForm';
import { AuthLayout } from '../../layouts/AuthLayout/AuthLayout';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { useSignupMutation } from '../../store/api/authApi';
import s from './SignUp.module.scss';
import notifTransl from '../Notifications.i18n.json';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const [signUp] = useSignupMutation();
  const goToDashboard = () => navigate('/dashboard');
  const { t } = useLocalTranslation(notifTransl);

  const register = async (data: SignUpDto) => {
    const dataObj: SignUpDto = {
      firstName: data.firstName,
      email: data.email,
      password: data.password,
    };

    try {
      await signUp(dataObj)
        .unwrap()
        .then((result: unknown) => {
          const tokens = result as Tokens;
          window.localStorage.setItem('accessToken', tokens.accessToken);
        });

      goToDashboard();
    } catch (e: unknown) {
      eventBus.emit(EventTypes.notification, {
        message: (e as CustomError).data.message,
        title: t('errorMsg'),
        type: NotificationType.DANGER,
      });
    }
  };

  return (
    <AuthLayout>
      <div className={s.signup_container}>
        <SignUpForm
          onSubmit={(data: SignUpDto) => register(data)}
          onLink={() => navigate('/signin')}
        />
      </div>
    </AuthLayout>
  );
}
