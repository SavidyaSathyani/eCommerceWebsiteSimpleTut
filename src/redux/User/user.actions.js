import userTypes from './user.types';

export const emailSignInStart = userCredentials => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START,
});

export const signInSuccess = user => ({
  type: userTypes.SIGNIN_SUCCESS,
  payload: user,
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGNOUT_USER_START,
});

export const signOutSuccess = () => ({
  type: userTypes.SIGNOUT_USER_SUCCESS,
});

export const signUpStart = (newUser) => ({
  type: userTypes.SIGN_UP_START,
  payload: newUser,
});

export const userErrors = (errors) => ({
  type: userTypes.USER_ERRORS,
  payload: errors,
});

export const passwordResetStart = (userEmail) => ({
  type: userTypes.PASSWARD_RESET_START,
  payload: userEmail,
});

export const passwordResetSuccess = () => ({
  type: userTypes.PASSWARD_RESET_SUCCESS,
  payload: true,
});

export const resetUserState = () => ({
  type: userTypes.RESET_USER_STATE,
});
