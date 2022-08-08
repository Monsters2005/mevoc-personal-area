import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormLayout } from '../../../layouts/AuthFormLayout/AuthFormLayout';
import { AuthSvgSelector } from '../AuthSvgSelector';
import s from './SignInForm.module.scss';
import schema from './validation';

import { SignInDto } from '../../../@types/dto/auth/signin.dto';
import HookFormInput from '../../HookForm/HookFormInput';
import { inputForm } from '../../../shared/styles/input-variations';

type Props = {
  onSubmit: SubmitHandler<SignInDto>;
  onLink: () => void;
};

export function SignInForm({ onSubmit, onLink }: Props) {
  const values = useForm<SignInDto>({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: SignInDto) => {
    onSubmit(data);
    values.setValue('password', '');
  };

  return (
    <FormProvider {...values}>
      <AuthFormLayout
        title="Log In"
        onSubmit={values.handleSubmit(submitHandler)}
        btnText="submit"
        bottomText="Don't have an account?"
        onBottomText={onLink}
      >
        <div className={s.signin_container}>
          <form onSubmit={values.handleSubmit(submitHandler)}>
            <HookFormInput
              name="email"
              placeholder="Your Email"
              icon={<AuthSvgSelector id="email" />}
              styles={inputForm}
              type="email"
            />
            <HookFormInput
              name="password"
              placeholder="Your Password"
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
