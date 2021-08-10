import OrdersActionTypes from './orders.types';
import UserActionTypes from '../user/user.types';

const INITIAL_STATE = {
  isFetching: false,
  items: null,
  errorMessage: ''
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrdersActionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case OrdersActionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.payload,
        errorMessage: ''
      };
    case OrdersActionTypes.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: null
      }
    default:
      return state;
  }
};

export default ordersReducer;