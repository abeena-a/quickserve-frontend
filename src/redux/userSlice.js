import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../api/axios";

/*
=================================
FETCH USERS
GET /api/auth/users
=================================
*/

export const fetchUsers =
  createAsyncThunk(
    "users/fetchUsers",
    async () => {
      const response =
        await api.get(
          "/auth/users"
        );

      return response.data;
    }
  );

/*
=================================
CREATE USER
POST /api/auth/register
=================================
*/

export const createUser =
  createAsyncThunk(
    "users/createUser",
    async (userData) => {
      const response =
        await api.post(
          "/auth/register",
          userData
        );

      return response.data.user;
    }
  );

/*
=================================
UPDATE USER
PUT /api/auth/users/:id
=================================
*/

export const updateUser =
  createAsyncThunk(
    "users/updateUser",
    async ({
      id,
      userData,
    }) => {

      const response =
        await api.put(
          `/auth/users/${id}`,
          userData
        );

      return response.data;
    }
  );

/*
=================================
DELETE USER
DELETE /api/auth/users/:id
=================================
*/

export const deleteUserAsync =
  createAsyncThunk(
    "users/deleteUser",
    async (id) => {

      await api.delete(
        `/auth/users/${id}`
      );

      return id;
    }
  );

const userSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    /*
    FETCH USERS
    */

    builder.addCase(
      fetchUsers.pending,
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addCase(
      fetchUsers.fulfilled,
      (state, action) => {
        state.loading = false;
        state.users =
          action.payload;
      }
    );

    builder.addCase(
      fetchUsers.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.error.message;
      }
    );

    /*
    CREATE USER
    */

    builder.addCase(
      createUser.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      createUser.fulfilled,
      (state, action) => {
        state.loading = false;

        state.users.push(
          action.payload
        );
      }
    );

    builder.addCase(
      createUser.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.error.message;
      }
    );

    /*
    UPDATE USER
    */

    builder.addCase(
      updateUser.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      updateUser.fulfilled,
      (state, action) => {
        state.loading = false;

        const index =
          state.users.findIndex(
            (user) =>
              user._id ===
              action.payload._id
          );

        if (index !== -1) {
          state.users[index] =
            action.payload;
        }
      }
    );

    builder.addCase(
      updateUser.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.error.message;
      }
    );

    /*
    DELETE USER
    */

    builder.addCase(
      deleteUserAsync.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      deleteUserAsync.fulfilled,
      (state, action) => {
        state.loading = false;

        state.users =
          state.users.filter(
            (user) =>
              user._id !==
              action.payload
          );
      }
    );

    builder.addCase(
      deleteUserAsync.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.error.message;
      }
    );
  },
});

export default userSlice.reducer;