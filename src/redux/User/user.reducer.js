import userTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  signInSuccess: false,
  signUpSuccess: false,
  signUpErrors: [],
  passwordResetSuccess: false,
  passwordResetErrors: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        signInSuccess: action.payload,
      };
    case userTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        signUpSuccess: action.payload,
      };
    case userTypes.SIGNUP_ERRORS:
      return {
        ...state,
        signUpErrors: action.payload,
      };
    case userTypes.PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        passwordResetSuccess: action.payload,
      };
    case userTypes.PASSWORD_RESET_ERRORS:
      return {
        ...state,
        passwordResetErrors: action.payload,
      };
    case userTypes.RESET_AUTH_FORMS:
      return {
        ...state,
        signInSuccess: false,
        signUpSuccess: false,
        signUpErrors: [],
        passwordResetSuccess: false,
        passwordResetErrors: [],
      };
    default:
      return state;
  }
};

export default userReducer;