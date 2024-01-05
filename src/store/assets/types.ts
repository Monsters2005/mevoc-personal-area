import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { store } from '../store';

export type DispatchType = typeof store.dispatch;
export type StoreType = ReturnType<typeof store.getState>;
export type ThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreType,
  unknown,
  Action<string>
>;
