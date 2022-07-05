import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_URL,
  prepareHeaders: headers => {
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  },
});
