import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormLayout } from '../../../layouts/AuthFormLayout/AuthFormLayout';
import { AuthSvgSelector } from '../AuthSvgSelector';
import s from './ResetPasswordForm.module.scss';
import schema from './validation';

import { ResetPasswordDto } from '../../../@types/dto/auth/reset-password.dto';
import HookFormInput from '../../HookForm/HookFormInput';

type Props = {
  onSubmit: SubmitHandler<ResetPasswordDto>;
};

const inputStyles = {
  width: '100%',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '21px',
};

export function ResetPasswordForm({ onSubmit }: Props) {
  const values = useForm<ResetPasswordDto>({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: ResetPasswordDto) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...values}>
      <AuthFormLayout
        title="Reset your password"
        onSubmit={values.handleSubmit(submitHandler)}
        btnText="Confirm"
      >
        <div className={s.resetpassword_container}>
          <form onSubmit={values.handleSubmit(submitHandler)}>
            <HookFormInput
              name="newPassword"
              placeholder="New Password"
              icon={<AuthSvgSelector id="password" />}
              styles={inputStyles}
              type="password"
            />
            <HookFormInput
              name="confirmPassword"
              placeholder="Confirm Password"
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
