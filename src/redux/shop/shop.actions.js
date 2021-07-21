import ShopActionTypes from './shop.types';

export const fetchProductsStart = () => ({
  type: ShopActionTypes.FETCH_PRODUCTS_START,
});

export const fetchProductsSuccess = categoriesMap => ({
  type: ShopActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: categoriesMap
});

export const fetchProductsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_PRODUCTS_FAILURE,
  payload: errorMessage
});
