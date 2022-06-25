import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormLayout } from '../../../layouts/AuthFormLayout/AuthFormLayout';
import { AuthSvgSelector } from '../AuthSvgSelector';
import s from './SignUpForm.module.scss';
import schema from './validation';

import { SignInDto } from '../../../@types/dto/auth/signin.dto';
import HookFormInput from '../../HookForm/HookFormInput';

type Props = {
  onSubmit: SubmitHandler<SignInDto>;
  onLink: () => void;
};

const inputStyles = {
  width: '100%',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '21px',
};

export function SignUpForm({ onSubmit, onLink }: Props) {
  const values = useForm<SignInDto>({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: SignInDto) => {
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
              styles={inputStyles}
              type="text"
            />
            <HookFormInput
              name="email"
              placeholder="New Email"
              icon={<AuthSvgSelector id="email" />}
              styles={inputStyles}
              type="email"
            />
            <HookFormInput
              name="password"
              placeholder="New Password"
              icon={<AuthSvgSelector id="password" />}
              styles={inputStyles}
              type="password"
            />
          </form>
        </div>
      </AuthFormLayout>
    </FormProvider>
  );
}
