import { takeLatest, call, put, all } from 'redux-saga/effects';

import { collection, getDocs } from 'firebase/firestore';

import { firestore, convertProductsToCategoryMap } from '../../firebase/firebase.utils';

import {
  fetchProductsSuccess,
  fetchProductsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchProductsAsyc() {
  try {
    const productsSnapshot = yield getDocs(collection(firestore, 'products'));
    const categoriesMap = yield call(
      convertProductsToCategoryMap,
      productsSnapshot
    );
    yield put(fetchProductsSuccess(categoriesMap));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export function* fetchProductsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_PRODUCTS_START,
    fetchProductsAsyc
  );
}

export function* shopSagas() {
  yield all([
    call(fetchProductsStart)
  ]);
}