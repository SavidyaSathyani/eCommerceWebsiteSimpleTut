import { takeLatest, call, all, put } from 'redux-saga/effects';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider, handleResetPasswordAPI } from '../../firebase/utils';
import userTypes from './user.types';
import { signInSuccess, signOutSuccess, passwordResetSuccess, userErrors } from './user.actions';

export function* getSnapShotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
    const snapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );

  } catch (err) {
    // console.log(err);
  }
};

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapShotFromUserAuth(user);

  } catch (err) {
    // console.log(err);
  }
};

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
};

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapShotFromUserAuth(user);
  }
  catch (err) {
    // console.log(err);
  }
};

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
};

export function* isUserAuthennticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapShotFromUserAuth(userAuth);

  } catch (err) {
    // console.log(err);
  }
};

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthennticated);
};

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());

  } catch (err) {
    // console.log(err);
  }
}

export function* onUserSignOutStart() {
  yield takeLatest(userTypes.SIGNOUT_USER_START, signOut);
};

export function* signUp({ payload: {
  displayName,
  email,
  password,
  confirmPassword
} }) {

  if (password !== confirmPassword) {
    const err = ['Passwords don\'t match'];
    yield put(
      userErrors(err)
    );
    return;
  }

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName };
    yield getSnapShotFromUserAuth(user, additionalData);
    // yield call(handleUserProfile, { user, { displayName } });

  } catch (err) {
    // console.log(err);
  }

};

export function* onSignupStart() {
  yield takeLatest(userTypes.SIGN_UP_START, signUp)
};

export function* passwordReset({ payload: { email } }) {
  try {
    yield call(handleResetPasswordAPI, email);
    yield put(
      passwordResetSuccess()
    );
  } catch (err) {
    yield put(
      userErrors(err)
    );
  }
}

export function* onPasswordResetStart() {
  yield takeLatest(userTypes.PASSWARD_RESET_START, passwordReset)
};

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
    call(onCheckUserSession),
    call(onUserSignOutStart),
    call(onPasswordResetStart),
    call(onSignupStart),
  ]);
};
