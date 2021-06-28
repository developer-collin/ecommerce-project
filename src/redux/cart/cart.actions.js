import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

export const updateItemQuantity = (item, quantity) => ({
  type: CartActionTypes.UPDATE_ITEM_QUANTITY,
  payload: { item, quantity }
});

export const clearItemFromCart = itemId => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: itemId
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART
});

export const setCartFromFirebase = cartItems => ({
  type: CartActionTypes.SET_CART_FROM_FIREBASE,
  payload: cartItems
});