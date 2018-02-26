import {
  REQUEST_REG,
  REG_SUCCESS,
  REG_FAILURE,
  REQUEST_EDIT,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  // LOGIN_SUCCESS,
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
    case REQUEST_REG:
    case REQUEST_EDIT:
      return {
        ...state,
        pending: true,
      };

    case REG_SUCCESS:
    case EDIT_SUCCESS:
      return {
        done: true,
        pending: false,
        success: true,
        error: initialState.error,
      };

    case REG_FAILURE:
    case EDIT_FAILURE:
      return {
        done: true,
        pending: false,
        success: false,
        error: action.error,
      };

    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};
