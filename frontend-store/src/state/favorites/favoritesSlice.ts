import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import favoritesService from "./favoritesService";

interface FavoritesState {
  favorites: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

// Get user from localStorage
const favorites = JSON.parse(localStorage.getItem("favorites")!);

const initialState: FavoritesState = {
  favorites: favorites ? favorites : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getFavorites = createAsyncThunk(
  "favorites/getFavorites",
  async (token: any, thunkAPI) => {
    try {
      return await favoritesService.getFavorites(token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<any>) => {
      state.favorites.push(action.payload.productId);
      console.log("saving");
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavorite: (state, action: PayloadAction<any>) => {
      const index = state.favorites.indexOf(action.payload.productId);
      state.favorites.splice(index, 1);
      console.log("saving");
      console.log(action.payload.productId);
      console.log(state.favorites);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    resetFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem("favorites");
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.favorites = action.payload;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.favorites = [];
      });
  },
});

export const { reset, addFavorite, removeFavorite, resetFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
