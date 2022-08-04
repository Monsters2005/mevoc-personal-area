import React from 'react';
import { useNavigate } from 'react-router';
import { SignInDto } from '../../@types/dto/auth/signin.dto';
import { Tokens } from '../../@types/dto/auth/tokens.dto';
import { SignInForm } from '../../components/Auth/SignInForm/SignInForm';
import { useSigninMutation } from '../../store/api/authApi';
import s from './SignIn.module.scss';

export function SignInPage() {
  const navigate = useNavigate();
  const [signIn] = useSigninMutation();
  const goToDashboard = () => navigate('/dashboard');

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

      goToDashboard();
    } catch (e: unknown) {
      // event bus notification
    }
  };

  return (
    <div className={s.signin_container}>
      <SignInForm
        onSubmit={(data: SignInDto) => login(data)}
        onLink={() => navigate('/signup')}
      />
    </div>
  );
}
