import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const localStorageData = JSON.parse(localStorage.getItem('user')!);

export interface AuthState {
  isAuthenticated: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  token?: string;
}

let initialState: AuthState;

if (localStorageData) {
  initialState = {
    isAuthenticated: localStorageData.isAuthenticated,
    firstName: localStorageData.firstName,
    lastName: localStorageData.lastName,
    email: localStorageData.email,
    token: localStorageData.token,
  };
} else {
  initialState = {
    isAuthenticated: false,
  };
}

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
      localStorage.setItem('user', JSON.stringify(state));
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { logout, login } = authSlice.actions;

export const selectAuth = (state: RootState) => state;

export default authSlice.reducer;
