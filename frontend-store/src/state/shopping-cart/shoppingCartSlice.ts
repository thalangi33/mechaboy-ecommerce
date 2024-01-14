import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import shoppingCartService from "./shoppingCartService";

interface ShoppingCartState {
  orderItems: any[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  url: string;
}

const initialState: ShoppingCartState = {
  orderItems: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  url: "",
};

// Register user
export const checkout = createAsyncThunk(
  "shoppingCart/checkout",
  async (order: any, thunkAPI) => {
    try {
      console.log(order.orderItems);
      const temp: any = [];
      order.orderItems.forEach((item: any) => {
        temp.push({
          product: item.id,
          color: item.color._id,
          quantity: item.quantity,
        });
      });
      return await shoppingCartService.checkout(order.token, temp);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<any>) => {
      const index = state.orderItems.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.color.name === action.payload.color.name
      );

      console.log("action payload", action.payload);

      if (index > -1) {
        state.orderItems[index].quantity += 1;
      } else {
        state.orderItems.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.orderItems.splice(action.payload, 1);
    },
    addQuantity: (state, action: PayloadAction<any>) => {
      const index = state.orderItems.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.color.name === action.payload.color.name
      );

      if (index > -1) {
        state.orderItems[index].quantity += 1;
      }
    },
    minusQuantity: (state, action: PayloadAction<any>) => {
      const index = state.orderItems.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.color.name === action.payload.color.name
      );

      if (index > -1 && state.orderItems[index].quantity > 1) {
        state.orderItems[index].quantity -= 1;
      }
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.url = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isSuccess = true;
        console.log(action.payload);
        state.url = action.payload.url;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { addItem, removeItem, addQuantity, minusQuantity, reset } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
