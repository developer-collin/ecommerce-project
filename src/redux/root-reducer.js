import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.slice';
import directoryReducer from './directory/directory.slice';
import shopReducer from './shop/shop.reducer';
import ordersReducer from './orders/orders.slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart', 'directory', 'shop', 'orders']
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
  orders: ordersReducer,
});

export default persistReducer(persistConfig, rootReducer);