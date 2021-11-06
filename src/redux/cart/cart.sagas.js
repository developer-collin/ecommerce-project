import { all, call, takeLatest, put, select } from 'redux-saga/effects';

import { setUserSuccess, signOutSuccess } from '../user/user.slice';
import { selectCurrentUser } from '../user/user.selectors';

import { addItem, removeItem, updateItemQuantity, clearItemFromCart, clearCart, setCartFromFirebase } from './cart.slice';
import { selectCartVersion, selectCartItems } from './cart.selectors';

import { getUserCartRef } from '../../firebase/firebase.utils';

import { getDoc, setDoc } from 'firebase/firestore';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  if(currentUser) {
    try {
      const cartRef = yield getUserCartRef(currentUser.id);
      const cartItems = yield select(selectCartItems);
      const currentCartVersion = yield select(selectCartVersion);
      yield setDoc(cartRef, {
        version: currentCartVersion,
        cartItems
      });
    } catch(error) {
      console.log(error);
    }
  }
}

export function* mergeCartWithFirebase() {
  const currentUser = yield select(selectCurrentUser);
  const currentCartVersion = yield select(selectCartVersion);

  try {
    const loggedOutCartItems = yield select(selectCartItems);
    const cartRef = yield getUserCartRef(currentUser.id);
    const cartSnapshot = yield getDoc(cartRef);
    const cartData = yield cartSnapshot.data();

    yield put(setCartFromFirebase(cartData.cartItems));

    if(currentCartVersion !== cartData.version) {
      for(let i = 0; i < loggedOutCartItems.length; i++) {
        yield put(addItem(loggedOutCartItems[i]));
      }
    }
  } catch(error) {
    console.log(error);
  }
}

export function* onCartChange() {
  yield takeLatest([
    addItem.type,
    removeItem.type,
    updateItemQuantity.type,
    clearItemFromCart.type,
    setCartFromFirebase.type
  ], updateCartInFirebase);
}

export function* onSignOutSuccess() {
  yield takeLatest(signOutSuccess.type, clearCartOnSignOut);
}

export function* onSetUserSuccess() {
  yield takeLatest(setUserSuccess.type, mergeCartWithFirebase);
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onSetUserSuccess),
    call(onCartChange)
  ]);
}
