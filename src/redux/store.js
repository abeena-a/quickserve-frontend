import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "./registerSlice";
import authReducer from "./authSlice";
import serviceReducer from "./serviceSlice";
import requestReducer from "./requestSlice";
import messageReducer from "./messageSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    auth: authReducer,
    services: serviceReducer,
    requests: requestReducer,
    messages: messageReducer,
    users : userReducer,
  },
});
