import {
  REQUEST_SHOP,
  RECEIVED_SHOP_SUCCESS,
  RECEIVED_SHOP_FAILURE,
  GET_PRODUCTS_BY_GROUP,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCT_BY_ID,
} from '../constants';

import axios from '../axios';

const requestShop = dispatch => dispatch({ type: REQUEST_SHOP });
const receivedSuccess = (dispatch, result) => dispatch({ type: RECEIVED_SHOP_SUCCESS, result });
const receivedFailure = dispatch => dispatch({ type: RECEIVED_SHOP_FAILURE });

async function getProductsByGroup(dispatch, group) {
  try {
    const res = await axios.get(`/api/products?group=${group}`);
    const { data: products } = res;

    dispatch({ type: GET_PRODUCTS_BY_GROUP, products, group });

    return products;
  } catch (e) {
    return e;
  }
}

async function getProductsByCategory(dispatch, category) {
  try {
    const res = await axios.get(`/api/products?category=${category}`);
    const { data: products } = res;

    dispatch({ type: GET_PRODUCTS_BY_CATEGORY, products, category });

    return products;
  } catch (e) {
    return e;
  }
}

async function getProductById(dispatch, id) {
  try {
    const res = await axios.get(`/api/products/${id}`);
    const { data: product } = res;

    dispatch({ type: GET_PRODUCT_BY_ID, product, id });

    return product;
  } catch (e) {
    return e;
  }
}

export function getProductsForHomePage(groups) {
  return async (dispatch) => {
    requestShop(dispatch);

    try {
      const responses = groups.map(async (group) => {
        try {
          const response = await getProductsByGroup(dispatch, group);

          return Promise.resolve(response);
        } catch (e) {
          return Promise.reject(e);
        }
      });
      const result = await Promise.all(responses);

      return receivedSuccess(dispatch, result);
    } catch (e) {
      receivedFailure(dispatch);

      throw e;
    }
  };
}

export function getProductsForCategoryPage(category) {
  return async (dispatch) => {
    requestShop(dispatch);

    try {
      const res = await getProductsByCategory(dispatch, category);

      return receivedSuccess(dispatch, res);
    } catch (e) {
      receivedFailure(dispatch);

      throw e;
    }
  };
}

export function getProductsForItemPage(category, id) {
  return async (dispatch) => {
    requestShop(dispatch);

    try {
      const res = await Promise.all([
        getProductsByCategory(dispatch, category),
        getProductById(dispatch, id),
      ]);

      return receivedSuccess(dispatch, res);
    } catch (e) {
      receivedFailure(dispatch);

      throw e;
    }
  };
}
