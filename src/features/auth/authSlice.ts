import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface AuthState {
  isAuthenticated: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  token?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',

  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState>) {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state;

export default authSlice.reducer;
