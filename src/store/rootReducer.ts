import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import { authSlice } from './slices/authSlice';
import { loginSlice } from './slices/loginSlice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  login: loginSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
