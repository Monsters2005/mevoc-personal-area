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
import Cookies from '../../components/Auth/Cookies/Cookies';
import { Logo } from '../../components/UI/Logo/Logo';
import { Dropdown } from '../../components/UI/DropDown/Dropdown';
import { Option } from '../../components/UI/DropDown/types';
import { languages } from '../../constants/kit/languages';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LSKeys } from '../../constants/LSKeys';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const [signUp] = useSignupMutation();
  const goToDashboard = () => navigate('/dashboard');
  const langOption = languages[0];
  const [lang, setLang] = useState<Option | undefined>(langOption);
  const { t } = useLocalTranslation(notifTransl);
  const [_, setLangDef] = useLocalStorage<string>(
    LSKeys.UI_LANGUAGE,
    'English'
  );

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
      setLangDef('English');
      eventBus.emit(EventTypes.setLang, 'English');
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
        <span className="logo">
          <Logo />
        </span>
        <span className="language-select">
          <Dropdown
            listTitle="Languages"
            options={languages}
            selectedItem={lang}
            setSelectedItem={(item: Option | undefined) => {
              setLang(item);
              setLangDef(item?.value);
              eventBus.emit(EventTypes.setLang, item?.value || 'English');
            }}
            allowNoneSelected={false}
            styles={{ width: '200px' }}
            listStyles={{ width: '300px', left: '-6.2rem' }}
          />
        </span>
        <SignUpForm
          onSubmit={(data: SignUpDto) => register(data)}
          onLink={() => navigate('/signin')}
        />
        <Cookies />
      </div>
    </AuthLayout>
  );
}
