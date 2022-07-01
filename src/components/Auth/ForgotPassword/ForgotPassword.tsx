import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormLayout } from '../../../layouts/AuthFormLayout/AuthFormLayout';
import { AuthSvgSelector } from '../AuthSvgSelector';
import s from './ForgotPassword.module.scss';
import schema from './validation';

import HookFormInput from '../../HookForm/HookFormInput';
import { ForgotPasswordDto } from '../../../@types/dto/auth/forgot-password.dto';

type Props = {
  onSubmit: SubmitHandler<ForgotPasswordDto> | (() => void);
  isLetterSent: boolean;
};

const inputStyles = {
  width: '100%',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '21px',
};

export function ForgotPasswordForm({ onSubmit, isLetterSent }: Props) {
  const values = useForm<ForgotPasswordDto>({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: ForgotPasswordDto) => {
    onSubmit(data);
    values.setValue('email', data.email);
    console.log(values.getValues());
  };

  const confirmHandler = () => {
    // TODO: link to log in page
    console.log('ok');
  };

  const usersEmail = values.getValues().email;

  return (
    <FormProvider {...values}>
      <AuthFormLayout
        title={isLetterSent ? 'Check your email' : 'Forgot Password?'}
        onSubmit={
          isLetterSent ? confirmHandler : values.handleSubmit(submitHandler)
        }
        btnText={isLetterSent ? 'go back' : 'next'}
        bottomText="Log in to your account"
        onBottomText={() => console.log('')} // TODO: link to log in page
      >
        <div className={s.forgotpassword_container}>
          {isLetterSent ? (
            <div className={s.forgotpassword_success}>
              <p>
                An email to
                {' '}
                <u>{usersEmail}</u>
                {' '}
                has been sent with a link to
                reset your password.
              </p>
              <p>
                Please, check your inbox or spam and follow the instructions in
                the email.
              </p>
            </div>
          ) : (
            <form onSubmit={values.handleSubmit(submitHandler)}>
              <HookFormInput
                name="email"
                placeholder="Your Email"
                icon={<AuthSvgSelector id="email" />}
                styles={inputStyles}
                type="email"
              />
            </form>
          )}
        </div>
      </AuthFormLayout>
    </FormProvider>
  );
}
