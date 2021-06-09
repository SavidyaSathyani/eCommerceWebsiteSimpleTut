import { auth, handleUserProfile, GoogleProvider } from '../../firebase/utils';
import userTypes from './user.types';

export const setCurrentUser = user => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInUser = ({ email, password }) => async dispatch => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: userTypes.SIGNIN_SUCCESS,
      payload: true,
    });

  } catch (err) {
    // console.log(err);
  }
};

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
  if (password !== confirmPassword) {
    const err = ['Passwords don\'t match'];
    dispatch({
      type: userTypes.SIGNUP_ERRORS,
      payload: err,
    });
    return;
  }

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await handleUserProfile(user, { displayName });
    dispatch({
      type: userTypes.SIGNUP_SUCCESS,
      payload: true,
    });

  } catch (err) {
    // console.log(err);
  }
};

export const resetPassword = ({ email }) => async dispatch => {
  try {
    const config = {
      url: 'http://localhost:3000/login',
    };

    await auth.sendPasswordResetEmail(email, config)
      .then(() => {
        dispatch({
          type: userTypes.PASSWORD_RESET_SUCCESS,
          payload: true,
        });
      })
      .catch(() => {
        const err = ['Email not found. Please try again.'];
        dispatch({
          type: userTypes.PASSWORD_RESET_ERRORS,
          payload: err,
        });
      });

  } catch (err) {
    // console.log(err);
  }
};

export const signInWithGoogle = () => async dispatch => {
  try {
    await auth.signInWithPopup(GoogleProvider)
      .then(() => {
        dispatch({
          type: userTypes.SIGNIN_SUCCESS,
          payload: true,
        });
      });
  }
  catch (err) {
    // console.log(err);
  }
};

export const signOut = () => dispatch => auth.signOut();

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS,
});
