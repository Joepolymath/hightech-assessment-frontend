import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import mailSlice from '../features/emails/mailSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    mails: mailSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
