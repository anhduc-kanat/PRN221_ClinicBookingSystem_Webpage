import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Tạo một instance axios với baseURL từ biến môi trường
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_ROOT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const forgotpasswordSlice = createSlice({
  name: "forgotpassword",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    forgotPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordSuccess: (state) => {
      state.loading = false;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { forgotPasswordStart, forgotPasswordSuccess, forgotPasswordFailure } = forgotpasswordSlice.actions;

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotPasswordStart());
  try {
    await axiosClient.post("/users/forgot-password", {
      email,
    });
    dispatch(forgotPasswordSuccess());
  } catch (error) {
    dispatch(forgotPasswordFailure(error.message));
  }
};

export default forgotpasswordSlice.reducer;
