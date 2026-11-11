import { createSlice } from "@reduxjs/toolkit";

const savedUser =
  JSON.parse(
    localStorage.getItem("user")
  ) || null;

const savedToken =
  localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: savedUser,
    token: savedToken,
    isAuthenticated:
      !!savedToken,
  },

  reducers: {
    loginSuccess: (
      state,
      action
    ) => {
      state.currentUser =
        action.payload.user;

      state.token =
        action.payload.token;

      state.isAuthenticated =
        true;
    },

    logout: (state) => {
      state.currentUser =
        null;

      state.token = null;

      state.isAuthenticated =
        false;

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );
    },
  },
});

export const {
  loginSuccess,
  logout,
} = authSlice.actions;

export default authSlice.reducer;