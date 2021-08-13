import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart, updateItemQuantityInCart } from './cart.utils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
  version: 0
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
        version: action.version
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
        version: action.version
      };
    case CartActionTypes.UPDATE_ITEM_QUANTITY:
      const { item, quantity } = action.payload;
      return {
        ...state,
        cartItems: updateItemQuantityInCart(state.cartItems, item, quantity),
        version: action.version
      }
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.id !== action.payload
        ),
        version: action.version
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        version: action.version
      };
    case CartActionTypes.SET_CART_FROM_FIREBASE:
      return {
        ...state,
        cartItems: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;