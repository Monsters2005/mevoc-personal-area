import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery, baseQueryWithReauth } from '../http/baseQuery';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['List', 'Word', 'User', 'Wordpack'],
});
