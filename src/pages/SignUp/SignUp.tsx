import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { SignUpDto } from '../../@types/dto/auth/signup.dto';
import { SignUpForm } from '../../components/Auth/SignUpForm/SignUpForm';
import { useSignupMutation } from '../../store/api/authApi';
import s from './SignUp.module.scss';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<SignUpDto | undefined>(undefined);

  const [signUp] = useSignupMutation();
  const goToDashboard = () => navigate('/dashboard');

  const register = async (data: SignUpDto) => {
    // if (!credentials) return;

    const dataObj: SignUpDto = {
      firstName: data.firstName,
      email: data.email,
      password: data.email,
    };

    try {
      await signUp(dataObj).unwrap();
      // goToDashboard();
    } catch (e: unknown) {
      // event bus notification
    }
  };

  // useEffect(() => {
  //   if (credentials) register();
  // }, [credentials]);

  return (
    <div className={s.signup_container}>
      <SignUpForm
        onSubmit={(data: SignUpDto) => register(data)}
        onLink={() => navigate('/signin')}
      />
    </div>
  );
}
