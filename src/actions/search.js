import {
  REQUEST_SEARCH,
  GET_SEARCH_ITEMS,
  RECEIVED_SEARCH_ITEMS_SUCCESS,
  RECEIVED_SEARCH_ITEMS_FAILURE,
} from '../constants';

import axios from '../axios';

export default async function getSearchItems(name) {
  return async (dispatch) => {
    dispatch({ type: REQUEST_SEARCH });

    try {
      const res = await axios.get(`/api/search?name=${name}`);
      const { data } = res;

      dispatch({ type: GET_SEARCH_ITEMS, data });

      return dispatch({ type: RECEIVED_SEARCH_ITEMS_SUCCESS });
    } catch (e) {
      dispatch({ type: RECEIVED_SEARCH_ITEMS_FAILURE });

      throw e;
    }
  };
}
