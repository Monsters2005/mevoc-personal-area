import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type LoginState = {
  username?: string;
  password?: string;
};

const initialState: LoginState = {
  username: undefined,
  password: undefined,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state: LoginState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state: LoginState, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    cleanLogin: (state: LoginState) => {
      state.username = undefined;
      state.password = undefined;
    },
  },
});

export const { setUsername, setPassword, cleanLogin } = loginSlice.actions;
