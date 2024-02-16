import { TOrder } from "@/types/main-types";
import { createSlice } from "@reduxjs/toolkit";

type TState = {
  isLoading: boolean;
  orders: TOrder[];
};

const initialState: TState = {
  isLoading: false,
  orders: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    loadingOrder: (state, action) => {
      state.isLoading = action.payload;
    },
    storeOrders: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
  },
});

export const { loadingOrder, storeOrders } = orderSlice.actions;

export default orderSlice.reducer;
