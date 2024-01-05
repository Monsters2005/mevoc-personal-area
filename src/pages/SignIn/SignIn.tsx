import { ExecException } from 'child_process';
import React, { ErrorInfo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Exception } from 'sass';
import { useDispatch } from 'react-redux';
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
import Cookies from '../../components/Auth/Cookies/Cookies';
import { Logo } from '../../components/UI/Logo/Logo';
import { Dropdown } from '../../components/UI/DropDown/Dropdown';
import { languages } from '../../constants/kit/languages';
import { Option } from '../../components/UI/DropDown/types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LSKeys } from '../../constants/LSKeys';
import {
  cleanLogin,
  setPassword,
  setUsername,
} from '../../store/slices/loginSlice';

export function SignInPage() {
  const navigate = useNavigate();
  const [signIn] = useSigninMutation();
  const goToDashboard = () => navigate('/dashboard');
  const langOption = languages[0];
  const [lang, setLang] = useState<Option | undefined>(langOption);
  const { t } = useLocalTranslation(notifTransl);
  const [_, setLangDef] = useLocalStorage<string>(
    LSKeys.UI_LANGUAGE,
    'English'
  );

  const dispatch = useDispatch();

  const login = async (data: SignInDto) => {
    const dataObj: SignInDto = {
      email: data.email,
      password: data.password,
    };

    dispatch(setUsername(data.email));
    dispatch(setPassword(data.password));

    try {
      await signIn(dataObj)
        .unwrap()
        .then((result: unknown) => {
          const tokens = result as Tokens;
          window.localStorage.setItem('accessToken', tokens?.accessToken);
          cleanLogin();
        });
      eventBus.emit(EventTypes.notification, {
        message: SUCCESS_LOGIN,
        title: t('success'),
        type: NotificationType.SUCCESS,
      });

      goToDashboard();
      setLangDef('English');
      eventBus.emit(EventTypes.setLang, 'English');
    } catch (e: unknown) {
      console.error(e);
      eventBus.emit(EventTypes.notification, {
        message: (e as CustomError)?.data?.message,
        title: t('error'),
        type: NotificationType.DANGER,
      });
    }
  };

  return (
    <AuthLayout>
      <div className={s.signin_container}>
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
        <SignInForm
          onSubmit={(data: SignInDto) => login(data)}
          onLink={() => navigate('/signup')}
        />
        <Cookies />
      </div>
    </AuthLayout>
  );
}
