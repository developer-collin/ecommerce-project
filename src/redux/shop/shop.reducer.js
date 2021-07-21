import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
  categories: null,
  isFetching: false,
  errorMessage: ''
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_PRODUCTS_START:
      return {
        ...state,
        isFetching: true
      }
    case ShopActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        categories: action.payload
      }
    case ShopActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }
    default:
      return state;
  }
};

export default shopReducer;