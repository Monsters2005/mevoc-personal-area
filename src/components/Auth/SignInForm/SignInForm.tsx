import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormLayout } from '../../../layouts/AuthFormLayout/AuthFormLayout';
import { Input } from '../../UI/Input/Input';
import { AuthSvgSelector } from '../AuthSvgSelector';
import s from './SignInForm.module.scss';
import schema from './validaiton';

import { SignInDto } from '../../../@types/dto/auth/signin.dto';
import HookFormInput from '../../HookForm/HookFormInput';

type Props = {
  onSubmit: SubmitHandler<SignInDto>;
};

const inputStyles = {
  width: '100%',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '21px',
};

export function SignInForm({ onSubmit }: Props) {
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
        bottomText="Forgot your password?"
        onBottomText={() => console.log('')} // TODO: link to forgot password page
      >
        <div className={s.signin_container}>
          <form onSubmit={values.handleSubmit(submitHandler)}>
            <HookFormInput
              name="login"
              placeholder="Your Email"
              icon={<AuthSvgSelector id="email" />}
              styles={inputStyles}
              type="email"
            />
            <HookFormInput
              name="password"
              placeholder="Your Password"
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
