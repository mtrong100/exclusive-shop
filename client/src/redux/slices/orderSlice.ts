import { createSlice } from "@reduxjs/toolkit";

type TOrder = {
  name: string;
  amount: number;
  image: string;
  product: string;
};

type TAddress = {
  fullName: string;
  address: string;
  city: string;
  phone: string;
};

type TState = {
  orderItems: TOrder[];
  shippingAddress: TAddress;
  paymentMethod: string;
  shippingPrice: number;
  totalPrice: number;
  user: string;
};

const initialState: TState = {
  orderItems: [],
  shippingAddress: {
    fullName: "",
    address: "",
    city: "",
    phone: "",
  },
  paymentMethod: "",
  shippingPrice: 0,
  totalPrice: 0,
  user: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;

      const isExistedOrder = state?.orderItems?.find(
        (item) => item?.product === orderItem.product
      );

      if (isExistedOrder) {
        isExistedOrder.amount += orderItem?.amount;
      } else {
        state.orderItems?.push(orderItem);
      }
    },
    removeOrderProduct: (state, action) => {
      const productId = action.payload;

      state.orderItems = state.orderItems?.filter(
        (item) => item.product !== productId
      );
    },
    increaseProductAmount: (state, action) => {
      const orderItem = action.payload;

      state.orderItems = state.orderItems?.map((item) =>
        item.product === orderItem?.product
          ? { ...item, amount: item.amount + 1 }
          : item
      );
    },
    decreaseProductAmount: (state, action) => {
      const orderItem = action.payload;

      if (orderItem?.amount === 1) {
        state.orderItems = state.orderItems?.filter(
          (item) => item.product !== orderItem?.product
        );
      } else {
        state.orderItems = state.orderItems?.map((item) =>
          item.product === orderItem?.product
            ? { ...item, amount: item.amount - 1 }
            : item
        );
      }
    },
    updateOrderProduct: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearOrder: () => {
      return initialState;
    },
  },
});

export const {
  addOrderProduct,
  removeOrderProduct,
  increaseProductAmount,
  decreaseProductAmount,
  updateOrderProduct,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
