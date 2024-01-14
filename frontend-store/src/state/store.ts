import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import shoppingCartReducer from "./shopping-cart/shoppingCartSlice";
import favoritesReducer from "./favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shoppingCart: shoppingCartReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
