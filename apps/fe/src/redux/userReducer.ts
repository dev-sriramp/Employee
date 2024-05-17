import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import { toast } from "sonner";


import axios from "axios";
const  API_URL  =  import.meta.env.VITE_BASE_URL as string


interface userType {
  data: any | null;
  loading: boolean;
  error: string | null;
}

//Define the initial state
const initialState: userType = {
  data: null,
  loading: false,
  error: null,
};

//Signup with API Call and Redux Storage
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    payload: {
      email: string;
      password: string;
      name: string;
    },
    thunkAPI
  ) => {
    try {
      const response: any = axios.post(`${API_URL}/register`, payload);
      return response;
    } catch (e) {
      throw thunkAPI.rejectWithValue(e);
    }
  }
);

//Define the types
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.data = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload.data.data;
      state.loading = false;
      toast.success("Signed Up Successfully");
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message || " An error occurred";
      state.loading = false;
      toast.error(action.error.message || " An error occurred");
    });
  },
});

export const userData = (state: RootState) => state.user.data;

export default userSlice.reducer;

export const { clearUserData } = userSlice.actions;
