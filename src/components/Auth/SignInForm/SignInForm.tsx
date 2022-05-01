import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormLayout } from '../../../layouts/FormLayout/FormLayout';
import { Input } from '../../UI/Input/Input';
import { AuthSvgSelector } from '../AuthSvgSelector';
import s from './SignInForm.module.scss';
import schema from './validaiton';

import { SignInDto } from '../../../@types/dto/auth/signin.dto';

type Props = {
  onSubmit: SubmitHandler<SignInDto>;
};

export function SignInForm({ onSubmit }: Props) {
  const inputStyles = {
    width: '100%',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '21px',
  };

  const values = useForm<SignInDto>({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: SignInDto) => {
    onSubmit(data);
    values.setValue('password', '');
  };

  return (
    <FormProvider {...values}>
      <FormLayout
        title="Log In"
        onClick={values.handleSubmit(submitHandler)}
        btnText="submit"
        bottomText="Forgot your password?"
        onBottomClick={() => console.log('')} // TODO: link to forgot password page
      >
        <div className={s.signin_container}>
          <form onSubmit={values.handleSubmit(submitHandler)}>
            <Input
              name="login"
              placeholder="Your Email"
              icon={<AuthSvgSelector id="email" />}
              styles={inputStyles}
              type="email"
            />
            <Input
              name="password"
              placeholder="Your Password"
              icon={<AuthSvgSelector id="password" />}
              styles={inputStyles}
              type="password"
            />
          </form>
        </div>
      </FormLayout>
    </FormProvider>
  );
}
