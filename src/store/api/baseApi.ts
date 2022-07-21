import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '../http/baseQuery';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  endpoints: () => ({}),
});
