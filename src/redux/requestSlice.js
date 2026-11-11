import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../api/axios";

/*
CREATE REQUEST
POST /api/requests
*/

export const createRequest =
  createAsyncThunk(
    "requests/createRequest",
    async (requestData) => {

      console.log(
        "REQUEST DATA:",
        requestData
      );

      const response =
        await api.post(
          "/requests",
          requestData
        );

      return response.data;
    }
  );

/*
CLIENT REQUESTS
GET /api/requests/client
*/

export const fetchClientRequests =
  createAsyncThunk(
    "requests/fetchClientRequests",
    async () => {
      const response =
        await api.get(
          "/requests/client"
        );

      return response.data;
    }
  );

/*
VENDOR REQUESTS
GET /api/requests/vendor
*/

export const fetchVendorRequests =
  createAsyncThunk(
    "requests/fetchVendorRequests",
    async () => {
      const response =
        await api.get(
          "/requests/vendor"
        );

      return response.data;
    }
  );



/*
ALL REQUESTS
Admin
GET /api/requests
*/

export const fetchRequests =
  createAsyncThunk(
    "requests/fetchRequests",
    async () => {
      const response =
        await api.get(
          "/requests"
        );

      return response.data;
    }
  );

/*
UPDATE REQUEST STATUS
PATCH /api/requests/:id/status
*/

export const updateRequestStatusAsync =
  createAsyncThunk(
    "requests/updateRequestStatusAsync",
    async ({
      requestId,
      status,
    }) => {
      const response =
        await api.patch(
          `/requests/${requestId}/status`,
          { status }
        );

      return response.data;
    }
  );

/*
SLICE
*/

const requestSlice = createSlice({
  name: "requests",

  initialState: {
    requests: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    /*
    CREATE REQUEST
    */

    builder.addCase(
      createRequest.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      createRequest.fulfilled,
      (state, action) => {
        state.loading = false;
        state.requests.push(
          action.payload
        );
      }
    );

    builder.addCase(
      createRequest.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.error.message;
      }
    );

    /*
    CLIENT REQUESTS
    */

    builder.addCase(
      fetchClientRequests.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      fetchClientRequests.fulfilled,
      (state, action) => {
        state.loading = false;
        state.requests =
          action.payload;
      }
    );

    builder.addCase(
      fetchClientRequests.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.error.message;
      }
    );




    /*
    VENDOR REQUESTS
    */

    builder.addCase(
      fetchVendorRequests.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      fetchVendorRequests.fulfilled,
      (state, action) => {
        state.loading = false;
        state.requests =
          action.payload;
      }
    );

    builder.addCase(
      fetchVendorRequests.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.error.message;
      }
    );



    /*
ALL REQUESTS
*/

builder.addCase(
  fetchRequests.pending,
  (state) => {
    state.loading = true;
  }
);

builder.addCase(
  fetchRequests.fulfilled,
  (state, action) => {
    state.loading = false;
    state.requests =
      action.payload;
  }
);

builder.addCase(
  fetchRequests.rejected,
  (state, action) => {
    state.loading = false;
    state.error =
      action.error.message;
  }
);

    /*
    UPDATE STATUS
    */

    builder.addCase(
      updateRequestStatusAsync.fulfilled,
      (state, action) => {

        const index =
          state.requests.findIndex(
            (request) =>
              request._id ===
              action.payload._id
          );

        if (index !== -1) {
          state.requests[index] =
            action.payload;
        }
      }
    );
  },
});

export default requestSlice.reducer;