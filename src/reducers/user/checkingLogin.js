import {
  REQUEST_LOGIN_FORGOT,
  LOGIN_FORGOT_SUCCESS,
  LOGIN_FORGOT_FAILURE,
  LOGIN_SUCCESS,
} from '../../constants';

const initialState = {
  done: false,
  pending: false,
  success: false,
  error: false,
  email: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN_FORGOT:
      return {
        ...state,
        pending: true,
      };

    case LOGIN_FORGOT_SUCCESS:
      return {
        done: true,
        pending: false,
        success: true,
        error: false,
        email: action.email,
      };

    case LOGIN_FORGOT_FAILURE:
      return {
        done: true,
        pending: false,
        success: false,
        error: true,
        email: initialState.email,
      };

    case LOGIN_SUCCESS:
      return initialState;

    default:
      return state;
  }
};
