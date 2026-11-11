import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  users: [
    // {
    //   _id: "admin-001",
    //   name: "Abi Ahammed",
    //   email: "abiahammed@gmail.com",
    //   role: "admin",
    //   password: "Admin@123",
    // },
    // {
    //   _id: "1",
    //   email: "zairu@gmail.com",
    //   role: "client",
    //   password: "Test@123",
    // },
    // {
    //   _id: "2",
    //   email: "jannah@gmail.com",
    //   role: "vendor",
    //   password: "Test@123",
    // },
  ],
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUsers: (state) => {
      state.users = []; // bulk clear
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user._id !== id); // single delete
    },
    editUser: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.users.findIndex((user) => user._id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedData };
      }
    },
  },
});

export const { addUser, removeUsers, deleteUser, editUser } = registerSlice.actions;
export default registerSlice.reducer;
