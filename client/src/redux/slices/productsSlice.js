/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProducts, createProduct, updateProduct, deleteProduct,
} from '../../services/api';

// Async thunks
export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    const response = await fetchProducts();
    return response;
  },
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product) => {
    const response = await createProduct(product);
    return response;
  },
);

export const modifyProduct = createAsyncThunk(
  'products/modifyProduct',
  async ({ id, product }) => {
    const response = await updateProduct(id, product);
    return response;
  },
);

export const removeProduct = createAsyncThunk(
  'products/removeProduct',
  async (id) => {
    await deleteProduct(id);
    return id;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    productCreatedBySocket: (state, action) => {
      const exists = state.items.find((p) => p._id === action.payload._id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    productUpdatedBySocket: (state, action) => {
      const index = state.items.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    productDeletedBySocket: (state, action) => {
      state.items = state.items.filter((p) => p._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Load products
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add product
      .addCase(addProduct.fulfilled, (state, action) => {
        const exists = state.items.some((p) => p._id === action.payload._id);
        if (!exists) {
          state.items.push(action.payload);
        }
      })
      // Update product
      .addCase(modifyProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete product
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
      });
  },
});

export const {
  productCreatedBySocket,
  productUpdatedBySocket,
  productDeletedBySocket,
} = productsSlice.actions;
export default productsSlice.reducer;
