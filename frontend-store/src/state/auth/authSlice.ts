import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

interface AuthState {
  user: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user")!);

const initialState: AuthState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user: any, thunkAPI) => {
    try {
      return await authService.register(user.email, user.password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (user: any, thunkAPI) => {
    try {
      return await authService.login(user.email, user.password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        const message = error.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// Logout user
export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(action.payload);
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(action.payload);
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
