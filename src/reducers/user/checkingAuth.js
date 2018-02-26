import {
  CHECK_USER_AUTH,
  USER_AUTH,
  USER_UNKNOWN,
} from '../../constants';

const initialState = {
  done: false,
  pending: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_USER_AUTH:
      return {
        ...state,
        pending: true,
      };

    case USER_AUTH:
    case USER_UNKNOWN:
      return {
        done: true,
        pending: false,
      };

    default:
      return state;
  }
};
