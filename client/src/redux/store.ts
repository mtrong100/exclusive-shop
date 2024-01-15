import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import userSlice from "./slices/userSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import orderSlice from "./slices/orderSlice";

export const reducer = combineReducers({
  user: userSlice,
  category: categorySlice,
  product: productSlice,
  order: orderSlice,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
