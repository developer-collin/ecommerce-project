import { takeLatest, call, put, all } from 'redux-saga/effects';

import { collection, getDocs } from 'firebase/firestore';

import { firestore, convertProductsToCategoryMap } from '../../firebase/firebase.utils';

import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from './shop.slice';

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

export function* onFetchProductsStart() {
  yield takeLatest(fetchProductsStart.type, fetchProductsAsyc);
}

export function* shopSagas() {
  yield all([
    call(onFetchProductsStart)
  ]);
}