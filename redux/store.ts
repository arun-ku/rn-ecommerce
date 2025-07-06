import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slices/productSlice";
import CartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    product: ProductSlice,
    cart: CartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
