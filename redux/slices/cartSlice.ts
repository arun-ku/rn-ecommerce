import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const { productId, variantId, quantity, price } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId && item.variantId === variantId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalQuantity += quantity;
      state.totalPrice += quantity * price;
    },
    removeFromCart(state, action: PayloadAction<CartItem>) {
      const { productId, variantId, quantity, price } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === productId && item.variantId === variantId
      );

      if (existingItemIndex >= 0) {
        const existingItem = state.items[existingItemIndex];
        if (existingItem.quantity > quantity) {
          existingItem.quantity -= quantity;
          state.totalQuantity -= quantity;
          state.totalPrice -= quantity * price;
        } else {
          state.totalQuantity -= existingItem.quantity;
          state.totalPrice -= existingItem.quantity * price;
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.totalQuantity;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartItemById = (
  state: RootState,
  productId: string,
  variantId: string
) =>
  state.cart.items.find(
    (item) => item.productId === productId && item.variantId === variantId
  );

export const selectCartItemCount = (state: RootState) => {
  return state.cart.items.length;
};

export default cartSlice.reducer;
