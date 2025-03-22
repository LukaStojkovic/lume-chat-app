import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/check");

      return res.data;
    } catch (err) {
      console.log("Error in checkAuth: ", err);
      return rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

export const signup = createAsyncThunk(
  "/auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully");

      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      return rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

export const logout = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      toast.success("Logged out successfully");

      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Logging out failed");
      return rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

export const login = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success("Logged in successfully");

      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Logging in failed");
      return rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "/auth/update-profile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      toast.success("Profile updated successfully");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Updating failed");
      return rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
        state.authUser = null;
      })
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload;
      })
      .addCase(signup.rejected, (state) => {
        state.isSigningUp = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
        state.socket = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
        state.authUser = action.payload;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isUpdatingProfile = false;
      });
  },
});

export default authSlice.reducer;
