import { takeLatest, call, put, all, select } from 'redux-saga/effects';

import { firestore } from '../../firebase/firebase.utils';
import { getDocs, collection, query, where, orderBy, limit } from 'firebase/firestore';

import { selectCurrentUser } from '../user/user.selectors';

import { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } from './orders.slice';

export function* fetchOrdersAsync() {
  const currentUser = yield select(selectCurrentUser);

  if(currentUser) {
    try {
      const ordersQuery = query(
        collection(firestore, `users/${currentUser.id}/orders`),
        where('orderComplete', '==', true),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const ordersSnapshot = yield getDocs(ordersQuery);

      const orders = {};

      ordersSnapshot.forEach(doc => {
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

export function* onFetchOrdersStart() {
  yield takeLatest(fetchOrdersStart.type, fetchOrdersAsync);
};

export function* ordersSagas() {
  yield all([
    call(onFetchOrdersStart),
  ]);
};
