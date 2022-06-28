import { ChangePasswordDto } from '../../@types/dto/auth/change-password.dto';
import { ForgotPasswordDto } from '../../@types/dto/auth/forgot-password.dto';
import { RestorePasswordDto } from '../../@types/dto/auth/restore-password.dto';
import { SignInDto } from '../../@types/dto/auth/signin.dto';
import { Tokens } from '../../@types/dto/auth/tokens.dto';
import { VerifyEmailDto } from '../../@types/dto/auth/verify-email.dto';
import { baseApi } from './baseApi';

const path = '/auth';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signin: builder.query<Tokens, SignInDto>({
      query: body => ({
        url: `${path}/signin`,
        method: 'POST',
        body,
      }),
    }),
    signout: builder.mutation<void, void>({
      query: () => ({
        url: `${path}/signout`,
        method: 'POST',
      }),
    }),
    refresh: builder.mutation<Tokens, void>({
      query: () => ({
        url: `${path}/refresh`,
        method: 'POST',
      }),
    }),

    forgotPassword: builder.mutation<void, ForgotPasswordDto>({
      query: body => ({
        url: `${path}/forgot-password`,
        method: 'POST',
        body,
      }),
    }),
    restorePassword: builder.mutation<void, RestorePasswordDto>({
      query: body => ({
        url: `${path}/restore-password`,
        method: 'POST',
        body,
      }),
    }),
    changePassword: builder.mutation<void, ChangePasswordDto>({
      query: body => ({
        url: `${path}/change-password`,
        method: 'POST',
        body,
      }),
    }),
    verify: builder.mutation<void, VerifyEmailDto>({
      query: body => ({
        url: `${path}/verify`,
        method: 'POST',
        body,
      }),
    }),
  }),
});
