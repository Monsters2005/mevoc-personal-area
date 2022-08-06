import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';
import { HTTP_UNAUTHORIZED } from '../../constants/httpStatuses';

const token = `Bearer ${localStorage.getItem('accessToken')}`;

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('authorization', token || '');
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === HTTP_UNAUTHORIZED) {
    const { data }: any = await baseQuery(
      { url: 'auth/refresh', method: 'POST' },
      api,
      extraOptions
    );
    if (data) {
      result = await baseQuery(args, api, extraOptions);
      localStorage.setItem('accessToken', data.accessToken);
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
