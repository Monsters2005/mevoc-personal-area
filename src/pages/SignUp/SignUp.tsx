import React from 'react';
import { SignUpForm } from '../../components/Auth/SignUpForm/SignUpForm';
import s from './SignUp.module.scss';

export default function SignUpPage() {
  return (
    <div className={s.signup_container}>
      <SignUpForm onSubmit={() => console.log()} />
    </div>
  );
}
