import UserActionTypes from './user.types';

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

export const authSuccess = user => {
  const serializedCreatedAt = user.createdAt.toDate().toISOString();
  return ({
    type: UserActionTypes.AUTH_SUCCESS,
    user: {
      ...user,
      createdAt: serializedCreatedAt
    }
  });
};

export const authFailure = errorMessage => ({
  type: UserActionTypes.AUTH_FAILURE,
  payload: errorMessage
});

export const signInSuccess = () => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
});

export const signInFailure = errorMessage => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: errorMessage
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
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

export const signUpSuccess = ({ userAuth, additionalData }) => {
  return ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: {
      userAuth,
      additionalData
    }
  })
};

export const signUpFailure = errorMessage => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: errorMessage
});