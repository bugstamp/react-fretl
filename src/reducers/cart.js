import {
  REQUEST_CART,
  RECEIVED_CART_SUCCESS,
  RECEIVED_CART_FAILURE,
  GET_CART,
  ADD,
  INCREMENT,
  DECREMENT,
  REMOVE,
  CHECKOUT,
  USER_AUTH,
  REG_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants';

const initialState = {
  loading: {
    done: false,
    pending: false,
    success: false,
  },
  items: [],
};

const loading = (state = initialState.loading, action) => {
  switch (action.type) {
    case REQUEST_CART:
      return {
        ...state,
        pending: true,
      };

    case RECEIVED_CART_SUCCESS:
      return {
        done: true,
        pending: false,
        success: true,
      };

    case RECEIVED_CART_FAILURE:
      return {
        done: true,
        pending: false,
        success: false,
      };

    default:
      return state;
  }
};

const items = (state = initialState.items, action) => {
  switch (action.type) {
    case USER_AUTH:
    case REG_SUCCESS:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
      return action.cart;

    case GET_CART:
      return action.items;

    case ADD: {
      const exist = state.some(item => item.productId === action.item.productId);

      if (state.length !== 0 && exist) {
        return state.map((item) => {
          if (item.productId === action.item.productId) {
            return { ...item, order: action.item.order };
          }

          return item;
        });
      }

      return [...state, action.item];
    }

    case INCREMENT:
    case DECREMENT: {
      return state.map((item) => {
        if (item.productId === action.item.productId) {
          return { ...item, order: action.item.order };
        }

        return item;
      });
    }

    case REMOVE: {
      return state.filter(item => item.productId !== action.productId);
    }

    default:
      return state;
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT:
      return initialState;

    default:
      return {
        loading: loading(state.loading, action),
        items: items(state.items, action),
      };
  }
};
