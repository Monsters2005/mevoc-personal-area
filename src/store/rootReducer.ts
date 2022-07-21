import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { baseApi } from './api/baseApi';
import { userApi } from './api/userApi';
import { wordApi } from './api/wordApi';
import { wordpackApi } from './api/wordpackApi';
import { authSlice } from './slices/authSlice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [wordApi.reducerPath]: wordApi.reducer,
  [wordpackApi.reducerPath]: wordApi.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
