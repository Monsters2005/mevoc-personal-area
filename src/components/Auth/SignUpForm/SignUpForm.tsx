import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormLayout } from '../../../layouts/AuthFormLayout/AuthFormLayout';
import { AuthSvgSelector } from '../AuthSvgSelector';
import s from './SignUpForm.module.scss';
import schema from './validation';

import { SignUpDto } from '../../../@types/dto/auth/signup.dto';
import HookFormInput from '../../HookForm/HookFormInput';
import { inputForm } from '../../../shared/styles/input-variations';

type Props = {
  onLink: () => void;
  onSubmit: SubmitHandler<SignUpDto>;
};

export function SignUpForm({ onSubmit, onLink }: Props) {
  const values = useForm<SignUpDto>({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: SignUpDto) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...values}>
      <AuthFormLayout
        title="Sign Up"
        onSubmit={values.handleSubmit(submitHandler)}
        btnText="submit"
        bottomText="Already have an account?"
        onBottomText={onLink}
      >
        <div className={s.signup_container}>
          <form onSubmit={values.handleSubmit(submitHandler)}>
            <HookFormInput
              name="firstName"
              placeholder="First Name"
              icon={<AuthSvgSelector id="person" />}
              styles={inputForm}
              type="text"
            />
            <HookFormInput
              name="email"
              placeholder="New Email"
              icon={<AuthSvgSelector id="email" />}
              styles={inputForm}
              type="email"
            />
            <HookFormInput
              name="password"
              placeholder="New Password"
              icon={<AuthSvgSelector id="password" />}
              styles={inputForm}
              type="password"
            />
          </form>
        </div>
      </AuthFormLayout>
    </FormProvider>
  );
}
