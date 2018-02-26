import {
  USER_AUTH,
  USER_UNKNOWN,
  REG_SUCCESS,
  EDIT_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../../constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case REG_SUCCESS:
    case LOGIN_SUCCESS:
    case USER_AUTH:
    case EDIT_SUCCESS:
      return action.user;

    case USER_UNKNOWN:
    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};
