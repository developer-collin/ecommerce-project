import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentUser: null,
  errorMessage: '',
  signupAdditionalData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    signUpSuccess: (state, action) => {
      state.signupAdditionalData = action.payload;
      state.errorMessage = '';
    },
    setUserSuccess: {
      reducer: (state, action) => {
        state.currentUser = action.payload;
        state.errorMessage = '';
      },
      prepare: (user) => {
        const serializedCreatedAt = user.createdAt.toDate().toISOString();
        return {
          payload: {
            ...user,
            createdAt: serializedCreatedAt
          }
        };
      }
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.errorMessage = '';
    },
    signUpFailure: (state, action) => {
      state.errorMessage = action.payload;
    },
    setUserFailure: (state, action) => {
      state.errorMessage = action.payload;
    },
    signInFailure: (state, action) => {
      state.errorMessage = action.payload;
    },
    signOutFailure: (state, action) => {
      state.errorMessage = action.payload;
    }
  }
});

export const {
  signUpSuccess,
  setUserSuccess,
  signOutSuccess,
  signUpFailure,
  setUserFailure,
  signInFailure,
  signOutFailure
} = userSlice.actions;

export default userSlice.reducer;