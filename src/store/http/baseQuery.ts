import { useNavigate } from 'react-router';
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';
import { HTTP_UNAUTHORIZED } from '../../constants/httpStatuses';

export const baseQuery = fetchBaseQuery({
  credentials: 'include',
  prepareHeaders: headers => {
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'application/json');
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.meta?.response?.status === 301) {
    window.location.href = '/tfauth';
    return result;
  }

  if (result.error && result.error.status === HTTP_UNAUTHORIZED) {
    const { data }: any = await baseQuery(
      { url: 'auth/refresh', method: 'POST' },
      api,
      extraOptions
    );
    if (data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery(
        { url: 'auth/signout', method: 'POST' },
        api,
        extraOptions
      );
      return result;
    }
  }

  return result;
};
