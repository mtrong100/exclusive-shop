import { TProduct } from "@/types/main-types";
import { createSlice } from "@reduxjs/toolkit";

type TState = {
  isLoading: boolean;
  products: TProduct[];
};

const initialState: TState = {
  isLoading: false,
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadingProducts: (state, action) => {
      state.isLoading = action.payload;
    },
    storeProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
  },
});

export const { loadingProducts, storeProducts } = productSlice.actions;

export default productSlice.reducer;
