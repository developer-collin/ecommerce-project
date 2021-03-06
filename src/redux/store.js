import { configureStore } from '@reduxjs/toolkit';

import { userAuthSuccess } from '../redux/user/user.actions';

import {
  persistStore,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
 } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import persistedReducer from './root-reducer';
import rootSaga from './root.saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [
          FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
          userAuthSuccess.type
        ],
      },
    }).concat(sagaMiddleware, logger),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);