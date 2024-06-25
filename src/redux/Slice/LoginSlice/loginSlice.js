import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../../services/api";
import { getRoleFromToken } from "src/utils/getRoleFromToken";

// Tạo async thunk
export const login = createAsyncThunk(
  "authentication/login",
  async ({ phoneNumber, password }, { rejectWithValue }) => {
    try {
      //response always return  a resolve promise
      const response = await postRequest("authentication/login", {
        phoneNumber,
        password,
      });
      // Lưu access token vào localStorage có thể xem xét thực hiện ngoài component
      if (response.data.statusCode === 200) {
        console.log("Login successful");
        console.log("Response:", response);

        // Lưu access token và refresh token vào localStorage
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const role = getRoleFromToken(response.data.data.accessToken);
        localStorage.setItem("role", role);

        const profile = await getRequest("/user/my-profile");
        localStorage.setItem("profile", JSON.stringify(profile.data.data));

        
        // Trả về dữ liệu user từ phản hồi API
        return { ...response.data, role };
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      // Trả về một custom error message hoặc error từ server
      return rejectWithValue(error.message);
    }
  }
);
export const signUp = createAsyncThunk(
  "user/signUp",
  async (
    { fullname, email, username, password, phoneNumber },
    { rejectWithValue }
  ) => {
    try {
      //response always return  a resolve promise
      const response = await postRequest("users/register", {
        fullname,
        email,
        username,
        password,
        phoneNumber,
      });
      // Lưu access token vào localStorage có thể xem xét thực hiện ngoài component

      if (response.status === 201) {
        console.log("Please check your phone number");

        return response?.data;
      }
    } catch (error) {
      // Trả về một custom error message hoặc error từ server
      return rejectWithValue(error.message);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "user/signUp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await postRequest("users/forgot-password", {
        email,
      });

      if (response.status === 200) {
        console.log("oke");
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ authorization, oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await postRequest("users/change-password", {
        authorization,
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        console.log("oke");

        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
};
export const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Could not log in. Please try again.";
      });
  },
});


export default loginSlice.reducer;
