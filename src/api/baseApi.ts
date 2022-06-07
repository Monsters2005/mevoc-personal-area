import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
  endpoints: () => ({}),
});
