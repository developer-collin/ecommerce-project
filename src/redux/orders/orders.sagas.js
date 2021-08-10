import { takeLatest, call, put, all, select } from 'redux-saga/effects';

import { firestore } from '../../firebase/firebase.utils';

import { selectCurrentUser } from '../user/user.selectors';

import {
  fetchOrdersSuccess,
  fetchOrdersFailure
} from './orders.actions';

import OrdersActionTypes from './orders.types';

export function* fetchOrdersAsync() {
  const currentUser = yield select(selectCurrentUser);

  if(currentUser) {
    try {
      const ordersSnapshot = yield firestore.collection(`users/${currentUser.id}/orders`).where('orderComplete', '==', true).orderBy('createdAt', 'desc').limit(5).get();

      const orders = {};
      ordersSnapshot.docs.forEach(doc => {
        const docData = doc.data();

        // Converting Firebase Timestamp to a serialized date
        const serializedDate = docData.createdAt.toDate().toISOString();

        orders[doc.id] = {
          id: doc.id,
          ...docData,
          createdAt: serializedDate
        }
      });

      yield put(fetchOrdersSuccess(orders));
    } catch (error) {
      yield put(fetchOrdersFailure(error.message));
    }
  } else {
    yield put(fetchOrdersFailure('Must be signed in to view orders.'));
  }
};

export function* fetchOrdersStart() {
  yield takeLatest(
    OrdersActionTypes.FETCH_ORDERS_START,
    fetchOrdersAsync
  );
};

export function* ordersSagas() {
  yield all([
    call(fetchOrdersStart),
  ]);
};
