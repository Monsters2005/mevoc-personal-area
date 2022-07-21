import React from 'react';
import { useNavigate } from 'react-router';
import { SignInForm } from '../../components/Auth/SignInForm/SignInForm';
import s from './SignIn.module.scss';

export function SignInPage() {
  const navigate = useNavigate();
  return (
    <div className={s.signin_container}>
      <SignInForm
        onSubmit={() => console.log('')}
        onLink={() => navigate('/signup')}
      />
    </div>
  );
}
