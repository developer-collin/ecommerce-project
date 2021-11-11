import { createAction } from '@reduxjs/toolkit'

export const googleSignInStart = createAction('user/googleSignInStart');
export const emailSignInStart = createAction('user/emailSignInStart');
export const userAuthSuccess = createAction('user/userAuthSuccess');
export const signOutStart = createAction('user/signOutStart');
export const signUpStart = createAction('user/signUpStart');
