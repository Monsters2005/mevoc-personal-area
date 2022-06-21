import React from 'react';
import { SignInForm } from '../../components/Auth/SignInForm/SignInForm';
import s from './SignIn.module.scss';

export function SignInPage() {
  return (
    <div className={s.signin_container}>
      <SignInForm onSubmit={() => console.log('')} />
    </div>
  );
}
