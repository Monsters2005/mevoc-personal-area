import { ChangePasswordDto } from '../../@types/dto/auth/change-password.dto';
import { ForgotPasswordDto } from '../../@types/dto/auth/forgot-password.dto';
import { RestorePasswordDto } from '../../@types/dto/auth/restore-password.dto';
import { SignInDto } from '../../@types/dto/auth/signin.dto';
import { SignUpDto } from '../../@types/dto/auth/signup.dto';
import { Tokens } from '../../@types/dto/auth/tokens.dto';
import { VerifyEmailDto } from '../../@types/dto/auth/verify-email.dto';
import { Path } from '../../constants/routes';
import { baseApi } from './baseApi';

const path = Path.AUTH;

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signup: builder.mutation<void, SignUpDto>({
      query(body) {
        return {
          method: 'POST',
          url: `${path}/${Path.SIGN_UP}`,
          body,
        };
      },
    }),
    signin: builder.mutation<Tokens, SignInDto>({
      query(body) {
        return {
          method: 'POST',
          url: `${path}/${Path.SIGN_IN}`,
          body,
        };
      },
    }),
    signout: builder.mutation<void, void>({
      query: () => ({
        url: `${path}/${Path.SIGN_OUT}`,
        method: 'POST',
      }),
      onQueryStarted(_, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(authApi.util.resetApiState());
        });
      },
    }),
    refresh: builder.mutation<Tokens, void>({
      query: () => ({
        url: `${path}/refresh`,
        method: 'POST',
      }),
    }),

    forgotPassword: builder.mutation<void, ForgotPasswordDto>({
      query: body => ({
        url: `${path}/${Path.FORGOT_PASSWORD}`,
        method: 'POST',
        body,
      }),
    }),
    restorePassword: builder.mutation<void, RestorePasswordDto>({
      query: body => ({
        url: `${path}/${Path.RESTORE_PASSWORD}`,
        method: 'POST',
        body,
      }),
    }),
    changePassword: builder.mutation<void, ChangePasswordDto>({
      query: body => ({
        url: `${path}/${Path.CHANGE_PASSWORD}`,
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

export const {
  useSignupMutation,
  useSigninMutation,
  useSignoutMutation,
  useRefreshMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useVerifyMutation,
} = authApi;
