import {
  USER_AUTH,
  USER_UNKNOWN,
  REG_SUCCESS,
  REQUEST_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  // LOGOUT_FAILURE,
} from '../../constants';

const initialState = {
  done: false,
  pending: false,
  success: false,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        pending: true,
      };

    case REG_SUCCESS:
    case LOGIN_SUCCESS:
    case USER_AUTH:
      return {
        done: true,
        pending: false,
        success: true,
        error: initialState.error,
      };

    case LOGIN_FAILURE:
      return {
        done: true,
        pending: false,
        success: false,
        error: action.error,
      };

    case USER_UNKNOWN:
    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};
