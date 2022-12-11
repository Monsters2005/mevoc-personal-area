import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import { authSlice } from './slices/authSlice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
