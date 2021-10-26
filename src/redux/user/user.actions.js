import UserActionTypes from './user.types';

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

export const setUserSuccess = user => {
  const serializedCreatedAt = user.createdAt.toDate().toISOString();
  return ({
    type: UserActionTypes.SET_USER_SUCCESS,
    user: {
      ...user,
      createdAt: serializedCreatedAt
    }
  });
};

export const setUserFailure = errorMessage => ({
  type: UserActionTypes.SET_USER_FAILURE,
  payload: errorMessage
});

export const signInFailure = errorMessage => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: errorMessage
});

export const userAuthSuccess = userAuth => ({
  type: UserActionTypes.USER_AUTH_SUCCESS,
  userAuth
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = errorMessage => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: errorMessage
});

export const signUpStart = userCredentials => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials
});

export const signUpSuccess = signupAdditionalData => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: signupAdditionalData
});

export const signUpFailure = errorMessage => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: errorMessage
});