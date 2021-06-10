import userTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  userErrors: [],
  resetPasswordSuccsess: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userErrors: [],
      };
    case userTypes.SIGNOUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case userTypes.PASSWARD_RESET_SUCCESS:
      return {
        ...state,
        resetPasswordSuccsess: action.payload,
      };
    case userTypes.USER_ERRORS:
      return {
        ...state,
        userErrors: action.payload,
      };
    case userTypes.RESET_USER_STATE:
      return {
        ...state,
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};

export default userReducer;