import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  errorMessage: ''
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signupAdditionalData: action.payload
      }
    case UserActionTypes.SET_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.user,
        errorMessage: ''
      }
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        errorMessage: ''
      }
    case UserActionTypes.SET_USER_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;