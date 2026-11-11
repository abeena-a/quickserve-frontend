import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../api/axios";

/*
=================================
CREATE SERVICE
=================================
*/

export const createService =
  createAsyncThunk(
    "services/createService",
    async (serviceData) => {
      const response =
        await api.post(
          "/services",
          serviceData
        );

      return response.data;
    }
  );

/*
=================================
GET ALL SERVICES (ADMIN)
=================================
*/

export const fetchServices =
  createAsyncThunk(
    "services/fetchServices",
    async () => {
      const response =
        await api.get(
          "/services"
        );

      return response.data;
    }
  );

/*
=================================
GET APPROVED SERVICES
=================================
*/

export const fetchApprovedServices =
  createAsyncThunk(
    "services/fetchApprovedServices",
    async () => {
      const response =
        await api.get(
          "/services/approved"
        );

      return response.data;
    }
  );

/*
=================================
GET VENDOR SERVICES
=================================
*/

export const fetchVendorServices =
  createAsyncThunk(
    "services/fetchVendorServices",
    async () => {
      const response =
        await api.get(
          "/services/vendor"
        );

      return response.data;
    }
  );

/*
=================================
APPROVE / REJECT SERVICE
=================================
*/

export const updateServiceStatusAsync =
  createAsyncThunk(
    "services/updateServiceStatusAsync",
    async ({
      serviceId,
      status,
    }) => {
      const response =
        await api.patch(
          `/services/${serviceId}/status`,
          { status }
        );

      return response.data;
    }
  );

/*
=================================
DELETE SERVICE
=================================
*/

export const deleteServiceAsync =
  createAsyncThunk(
    "services/deleteServiceAsync",
    async (serviceId) => {
      await api.delete(
        `/services/${serviceId}`
      );

      return serviceId;
    }
  );

const serviceSlice = createSlice({
  name: "services",

  initialState: {
    services: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    /*
    ==========================
    CREATE SERVICE
    ==========================
    */

    builder
      .addCase(
        createService.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        createService.fulfilled,
        (state, action) => {
          state.loading = false;
          state.services.push(
            action.payload
          );
        }
      )
      .addCase(
        createService.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message;
        }
      );

    /*
    ==========================
    FETCH ALL SERVICES
    ==========================
    */

    builder
      .addCase(
        fetchServices.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        fetchServices.fulfilled,
        (state, action) => {
          state.loading = false;
          state.services =
            action.payload;
        }
      )
      .addCase(
        fetchServices.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message;
        }
      );

    /*
    ==========================
    FETCH APPROVED SERVICES
    ==========================
    */

    builder
      .addCase(
        fetchApprovedServices.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        fetchApprovedServices.fulfilled,
        (state, action) => {
          state.loading = false;
          state.services =
            action.payload;
        }
      )
      .addCase(
        fetchApprovedServices.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message;
        }
      );

    /*
    ==========================
    FETCH VENDOR SERVICES
    ==========================
    */

    builder
      .addCase(
        fetchVendorServices.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        fetchVendorServices.fulfilled,
        (state, action) => {
          state.loading = false;
          state.services =
            action.payload;
        }
      )
      .addCase(
        fetchVendorServices.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message;
        }
      );

    /*
    ==========================
    UPDATE STATUS
    ==========================
    */

    builder.addCase(
      updateServiceStatusAsync.fulfilled,
      (state, action) => {

        const index =
          state.services.findIndex(
            (service) =>
              service._id ===
              action.payload._id
          );

        if (index !== -1) {
          state.services[index] =
            action.payload;
        }
      }
    );

    /*
    ==========================
    DELETE SERVICE
    ==========================
    */

    builder.addCase(
      deleteServiceAsync.fulfilled,
      (state, action) => {

        state.services =
          state.services.filter(
            (service) =>
              service._id !==
              action.payload
          );
      }
    );
  },
});

export default serviceSlice.reducer;