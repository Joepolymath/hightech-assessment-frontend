import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface ISingleMessage {
  _id: string;
  subject: string;
  content: string;
  user: string;
  isRead: boolean;
  profileImage?: string;
  createdAt?: string;
}

export interface MessageState {
  messages: ISingleMessage[];
  unreadMessages: number;
  totalMessages: number;
}

const initialState: MessageState = {
  messages: [],
  unreadMessages: 0,
  totalMessages: 0,
};

export const messagesSlice = createSlice({
  name: 'mails',

  initialState,
  reducers: {
    loadMessages(state, action: PayloadAction<MessageState>) {
      state.messages = action.payload.messages;
      state.unreadMessages = action.payload.unreadMessages;
      state.totalMessages = action.payload.totalMessages;
    },
  },
});

export const { loadMessages } = messagesSlice.actions;

export const selectMessages = (state: RootState) => state;

export default messagesSlice.reducer;
