import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';
import { wordApi } from '../api/wordApi';
import { wordpackApi } from '../api/wordpackApi';

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [wordApi.reducerPath]: wordApi.reducer,
  [wordpackApi.reducerPath]: wordApi.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
