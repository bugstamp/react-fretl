import {
  // REQUEST_SEARCH,
  GET_SEARCH_ITEMS,
  // RECEIVED_SEARCH_ITEMS_SUCCESS,
  // RECEIVED_SEARCH_ITEMS_FAILURE,
} from '../constants';

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return initialState;

    case GET_SEARCH_ITEMS:
      return { items: action.data };

    default:
      return state;
  }
};
