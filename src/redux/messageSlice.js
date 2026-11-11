import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../api/axios";

/*
=================================
SEND MESSAGE
POST /api/messages
=================================
*/

export const sendMessage =
  createAsyncThunk(
    "messages/sendMessage",
    async (messageData) => {

      const response =
        await api.post(
          "/messages",
          messageData
        );

      return response.data;
    }
  );

/*
=================================
FETCH REQUEST CHAT
GET /api/messages/request/:requestId
=================================
*/

export const fetchMessages =
  createAsyncThunk(
    "messages/fetchMessages",
    async (requestId) => {

      const response =
        await api.get(
          `/messages/${requestId}`
        );

      return response.data;
    }
  );

const messageSlice = createSlice({
  name: "messages",

  initialState: {
    messages: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
  },

  extraReducers: (builder) => {

    /*
    SEND MESSAGE
    */

    builder.addCase(
      sendMessage.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      sendMessage.fulfilled,
      (state, action) => {
        state.loading = false;

        state.messages.push(
          action.payload
        );
      }
    );

    builder.addCase(
      sendMessage.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.error.message;
      }
    );

    /*
    FETCH MESSAGES
    */

    builder.addCase(
      fetchMessages.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      fetchMessages.fulfilled,
      (state, action) => {
        state.loading = false;

        state.messages =
          action.payload;
      }
    );

    builder.addCase(
      fetchMessages.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.error.message;
      }
    );
  },
});

export const {
  clearMessages,
} = messageSlice.actions;

export default messageSlice.reducer;