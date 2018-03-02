import {
  REQUEST_SHOP,
  RECEIVED_SHOP_SUCCESS,
  RECEIVED_SHOP_FAILURE,
  GET_PRODUCTS_BY_GROUP,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCT_BY_ID,
} from '../constants';

const initialState = {
  loading: {
    done: false,
    pending: false,
    success: false,
  },
  products: [],
  item: {},
};

const loading = (state = initialState.loading, action) => {
  switch (action.type) {
    case REQUEST_SHOP:
      return {
        ...state,
        pending: true,
      };

    case RECEIVED_SHOP_SUCCESS:
      return {
        done: true,
        pending: false,
        success: true,
      };

    case RECEIVED_SHOP_FAILURE:
      return {
        done: true,
        pending: false,
        success: false,
      };

    default:
      return state;
  }
};

const products = (state = initialState.products, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_CATEGORY:
      return action.products;

    case GET_PRODUCTS_BY_GROUP: {
      return [...state, ...action.products];
    }

    default:
      return state;
  }
};

const item = (state = initialState.item, action) => {
  switch (action.type) {
    case GET_PRODUCT_BY_ID:
      return action.product;

    default:
      return state;
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SHOP:
      return {
        ...initialState,
        loading: loading(state.loading, action),
      };

    default:
      return {
        loading: loading(state.loading, action),
        products: products(state.products, action),
        item: item(state.item, action),
      };
  }
};
