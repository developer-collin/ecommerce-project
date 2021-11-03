import { createSlice } from '@reduxjs/toolkit';

import UserActionTypes from '../user/user.types';

const INITIAL_STATE = {
  isFetching: false,
  items: null,
  errorMessage: ''
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: INITIAL_STATE,
  reducers: {
    fetchOrdersStart: (state) => {
      state.isFetching = true;
    },
    fetchOrdersSuccess: (state, action) => {
      state.isFetching = false;
      state.items = action.payload;
      state.errorMessage = '';
    },
    fetchOrdersFailure: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(UserActionTypes.SIGN_OUT_SUCCESS, (state) => {
      state.isFetching = false;
      state.items = null;
    });
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure
} = ordersSlice.actions;

export default ordersSlice.reducer;