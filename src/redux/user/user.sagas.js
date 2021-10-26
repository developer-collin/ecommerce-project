import { takeLatest, put, all, call } from 'redux-saga/effects'

import { getDoc } from 'firebase/firestore';

import UserActionTypes from './user.types';

import {
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
  setUserSuccess,
  setUserFailure
} from './user.actions';

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as authSignOut
} from "firebase/auth";

import {
  auth,
  googleProvider,
  createUserProfileDocument
} from '../../firebase/firebase.utils';

export function* setUserFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield getDoc(userRef);
    yield put(
      setUserSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch(error) {
    yield put(setUserFailure(error.message));
  }
}

export function* userAuthenticated({ userAuth }) {
  try {
    yield setUserFromUserAuth(userAuth);
  } catch(error) {
    yield put(setUserFailure(error.message));
  }
}

export function* signInWithGoogle() {
  try {
    yield signInWithPopup(auth, googleProvider);
  } catch(error) {
    yield put(signInFailure(error.message));
  }
}

export function* signInWithEmail({payload: { email, password }}) {
  try {
    yield signInWithEmailAndPassword(auth, email, password);
  } catch(error) {
    yield put(signInFailure(error.message));
  }
}

export function* signOut() {
  try {
    yield authSignOut(auth);
    yield put(signOutSuccess());
  } catch(error) {
    yield put(signOutFailure(error.message));
  }
}

export function* signUp({payload: { email, password, displayName }}) {
  try {
    const { user: userAuth } = yield createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const signupAdditionalData = {
      displayName
    };

    yield call(createUserProfileDocument, userAuth, signupAdditionalData);

    yield put(signUpSuccess());
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onUserAuthenticated() {
  yield takeLatest(UserActionTypes.USER_AUTH_SUCCESS, userAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onUserAuthenticated),
    call(onSignOutStart),
    call(onSignUpStart)
  ]);
}