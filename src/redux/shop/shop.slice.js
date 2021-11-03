import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  categories: null,
  isFetching: false,
  errorMessage: ''
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState: INITIAL_STATE,
  reducers: {
    fetchProductsStart: (state) => {
      state.isFetching = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.categories = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    }
  }
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure
} = shopSlice.actions;

export default shopSlice.reducer;