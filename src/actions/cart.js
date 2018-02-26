import {
  REQUEST_CART,
  RECEIVED_CART_SUCCESS,
  RECEIVED_CART_FAILURE,
  GET_CART,
  ADD,
  INCREMENT,
  DECREMENT,
  REMOVE,
  CHECKOUT } from '../constants';

import axios from '../axios';

export function getCart() {
  return async (dispatch) => {
    dispatch({ type: REQUEST_CART });

    try {
      const res = await axios.get('/api/cart/');
      const { data: items } = res;

      dispatch({ type: GET_CART, items });

      return dispatch({ type: RECEIVED_CART_SUCCESS });
    } catch (e) {
      dispatch({ type: RECEIVED_CART_FAILURE });

      throw e;
    }
  };
}

export function addToCart(productId, order) {
  return async (dispatch) => {
    dispatch({ type: REQUEST_CART });

    try {
      const res = await axios.post('/api/cart/', { productId, order });
      const { data: item } = res;

      dispatch({ type: ADD, item });

      return dispatch({ type: RECEIVED_CART_SUCCESS });
    } catch (e) {
      dispatch({ type: RECEIVED_CART_FAILURE });

      throw e;
    }
  };
}

export function increment(productId) {
  return async (dispatch) => {
    dispatch({ type: REQUEST_CART });

    try {
      const res = await axios.put('/api/cart/', { productId, type: INCREMENT });
      const { data: item } = res;

      dispatch({ type: INCREMENT, item });

      return dispatch({ type: RECEIVED_CART_SUCCESS });
    } catch (e) {
      dispatch({ type: RECEIVED_CART_FAILURE });

      throw e;
    }
  };
}

export function decrement(productId) {
  return async (dispatch) => {
    dispatch({ type: REQUEST_CART });

    try {
      const res = await axios.put('/api/cart/', { productId, type: DECREMENT });
      const { data: item } = res;

      dispatch({ type: DECREMENT, item });

      return dispatch({ type: RECEIVED_CART_SUCCESS });
    } catch (e) {
      dispatch({ type: RECEIVED_CART_FAILURE });

      throw e;
    }
  };
}

export function remove(id) {
  return async (dispatch) => {
    dispatch({ type: REQUEST_CART });

    try {
      const res = await axios.delete(`/api/cart/${id}`);
      const { result } = res.data;

      if (result) {
        dispatch({ type: REMOVE, productId: id });

        return dispatch({ type: RECEIVED_CART_SUCCESS });
      }

      return dispatch({ type: RECEIVED_CART_FAILURE });
    } catch (e) {
      throw e;
    }
  };
}

export function checkout() {
  return (dispatch) => {
    dispatch({
      type: CHECKOUT,
    });
  };
}
