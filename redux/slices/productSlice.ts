import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/product/product";
import { RootState } from "../store";
import { CATEGORY_IDS } from "../../constants/mockData/categories";

interface ProductState {
  productsById: { [id: string]: Product };
  allProducts: string[];
  loading: boolean;
  error: string | null;
  productsByCategory: { [id: string]: string[] };
}

const initialState: ProductState = {
  productsById: {},
  allProducts: [],
  loading: false,
  error: null,
  productsByCategory: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.productsById = action.payload.reduce((acc, product) => {
        acc[product.productId] = product;
        return acc;
      }, {} as { [id: string]: Product });
      state.productsByCategory = action.payload.reduce((acc, product) => {
        product.categoryIds.forEach((categoryId) => {
          if (!acc[`${categoryId}`]) {
            acc[`${categoryId}`] = [];
          }
          acc[`${categoryId}`].push(product.productId);
        });
        acc[CATEGORY_IDS.ALL] = acc[CATEGORY_IDS.ALL] || [];
        acc[CATEGORY_IDS.ALL].push(product.productId);
        return acc;
      }, {} as { [id: string]: string[] });

      state.allProducts = action.payload.map((product) => product.productId);
      state.loading = false;
    },
    addOrUpdateProduct(state, action: PayloadAction<{ product: Product }>) {
      const { product } = action.payload;
      const productId = product.productId;
      state.productsById[productId] = product;
      if (!state.allProducts.includes(productId)) {
        state.allProducts.push(productId);
      }
      product.categoryIds.forEach((categoryId) => {
        if (!state.productsByCategory[`${categoryId}`]) {
          state.productsByCategory[`${categoryId}`] = [];
        }
        if (!state.productsByCategory[`${categoryId}`].includes(productId)) {
          state.productsByCategory[`${categoryId}`].push(productId);
        }
      });
      if (!state.productsByCategory[CATEGORY_IDS.ALL]) {
        state.productsByCategory[CATEGORY_IDS.ALL] = [];
      }
      if (!state.productsByCategory[CATEGORY_IDS.ALL].includes(productId)) {
        state.productsByCategory[CATEGORY_IDS.ALL].push(productId);
      }
    },
  },
});
export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addOrUpdateProduct,
} = productSlice.actions;
export const selectProductLoading = (state: RootState) => state.product.loading;
export const selectProductError = (state: RootState) => state.product.error;
export const selectProductById = (state: RootState, productId: string) =>
  state.product.productsById[productId];
export const selectAllProductIds = (state: RootState) =>
  state.product.allProducts;
export const selectProductsByCategory = (
  state: RootState,
  categoryId: string
) => state.product.productsByCategory[categoryId];

export default productSlice.reducer;
