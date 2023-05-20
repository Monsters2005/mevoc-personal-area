import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../@types/entities/User';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';

export type AuthState = {
  currentUser: User | null;
  isAuthorized: boolean;
  isFetching: boolean;
};

const initialState: AuthState = {
  currentUser: null,
  isAuthorized: false,
  isFetching: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state: AuthState, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setIsAuthorized: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
    setIsFetching: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.signin.matchFulfilled, state => {
        state.isAuthorized = true;
      })
      .addMatcher(authApi.endpoints.signup.matchFulfilled, state => {
        state.isAuthorized = true;
      })
      .addMatcher(userApi.endpoints.getCurrentUser.matchFulfilled, state => {
        state.isAuthorized = true;
      })
      .addMatcher(
        userApi.endpoints.getCurrentUser.matchRejected,
        (state, action) => {
          if (action.error.name === 'ConditionError') return;
          state.isAuthorized = false;
        }
      )
      .addMatcher(authApi.endpoints.signout.matchFulfilled, state => {
        state.isAuthorized = false;
      });
  },
});

export const { setCurrentUser, setIsAuthorized, setIsFetching } = authSlice.actions;
