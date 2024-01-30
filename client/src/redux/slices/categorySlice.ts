import { TCategory } from "@/types/main-types";
import { createSlice } from "@reduxjs/toolkit";

type TState = {
  isLoading: boolean;
  categories: TCategory[];
};

const initialState: TState = {
  isLoading: false,
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    loadingCategories: (state, action) => {
      state.isLoading = action.payload;
    },
    storeCategories: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
  },
});

export const { storeCategories, loadingCategories } = categorySlice.actions;

export default categorySlice.reducer;
