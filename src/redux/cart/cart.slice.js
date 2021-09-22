import { createSlice } from '@reduxjs/toolkit';

import { addItemToCart, removeItemFromCart, updateItemQuantityInCart } from './cart.utils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
  version: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    toggleCartHidden: (state) => {
      return {
        ...state,
        hidden: !state.hidden
      };
    },
    addItem: {
      reducer: (state, action) => {
        const { item, version } = action.payload;
        state.cartItems = addItemToCart(state.cartItems, item);
        state.version = version;
      },
      prepare: (item) => {
        return {
          payload: {
            item,
            version: Date.now()
          }
        };
      }
    },
    removeItem: {
      reducer: (state, action) => {
        const { item, version } = action.payload;
        state.cartItems = removeItemFromCart(state.cartItems, item);
        state.version = version;
      },
      prepare: (item) => {
        return {
          payload: {
            item,
            version: Date.now()
          }
        }
      }
    },
    updateItemQuantity: {
      reducer: (state, action) => {
        const { item, quantity, version } = action.payload;
        state.cartItems = updateItemQuantityInCart(state.cartItems, item, quantity);
        state.version = version
      },
      prepare: (item, quantity) => {
        return {
          payload: {
            item,
            quantity,
            version: Date.now()
          }
        }
      }
    },
    clearItemFromCart: {
      reducer: (state, action) => {
        const { itemId, version } = action.payload;
        state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== itemId);
        state.version = version;
      },
      prepare: (itemId) => {
        return {
          payload: {
            itemId,
            version: Date.now()
          }
        }
      }
    },
    clearCart: {
      reducer: (state, action) => {
        state.cartItems = [];
        state.version = action.payload.version;
      },
      prepare: () => {
        return {
          payload: {
            version: Date.now()
          }
        }
      }
    },
    setCartFromFirebase: (state, action) => {
      state.cartItems = action.payload
    }
  }
});

export const {
  toggleCartHidden,
  addItem,
  removeItem,
  updateItemQuantity,
  clearItemFromCart,
  clearCart,
  setCartFromFirebase
} = cartSlice.actions;

export default cartSlice.reducer;