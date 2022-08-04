import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { SignUpDto } from '../../@types/dto/auth/signup.dto';
import { SignUpForm } from '../../components/Auth/SignUpForm/SignUpForm';
import { useSignupMutation } from '../../store/api/authApi';
import s from './SignUp.module.scss';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const [signUp] = useSignupMutation();
  const goToDashboard = () => navigate('/dashboard');

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
      // event bus notification
    }
  };

  return (
    <div className={s.signup_container}>
      <SignUpForm
        onSubmit={(data: SignUpDto) => register(data)}
        onLink={() => navigate('/signin')}
      />
    </div>
  );
}
