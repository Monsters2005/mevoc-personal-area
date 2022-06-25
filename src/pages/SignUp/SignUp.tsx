import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { SignUpForm } from '../../components/Auth/SignUpForm/SignUpForm';
import s from './SignUp.module.scss';

export default function SignUpPage() {
  const navigate = useNavigate();
  return (
    <div className={s.signup_container}>
      <SignUpForm
        onSubmit={() => console.log()}
        onLink={() => navigate('/signin')}
      />
    </div>
  );
}
