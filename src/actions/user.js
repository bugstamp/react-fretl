import { push } from 'react-router-redux';

import {
  CHECK_USER_AUTH,
  USER_AUTH,
  USER_UNKNOWN,
  REQUEST_REG,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_LOGIN_FORGOT,
  REQUEST_EDIT,
  REG_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FORGOT_SUCCESS,
  EDIT_SUCCESS,
  REG_FAILURE,
  LOGIN_FAILURE,
  LOGOUT_FAILURE,
  LOGIN_FORGOT_FAILURE,
  EDIT_FAILURE,
} from '../constants';

import axios from '../axios';

export function checkUserAuth({ redirect }) {
  return async (dispatch) => {
    dispatch({ type: CHECK_USER_AUTH });

    try {
      const res = await axios.get('/api/auth');
      const { user, cart } = res.data;

      return dispatch({ type: USER_AUTH, user, cart });
    } catch (e) {
      if (e.message === 'Request failed with status code 401') {
        if (redirect) {
          dispatch({ type: USER_UNKNOWN });

          return dispatch(push('/'));
        }

        return dispatch({ type: USER_UNKNOWN });
      }

      throw e;
    }
  };
}

export function checkUserLogin(email) {
  return async (dispatch) => {
    dispatch({ type: REQUEST_LOGIN_FORGOT });

    try {
      const res = await axios.get(`/api/auth/forgot?email=${email}`);
      const { data } = res;

      if (!data.message) {
        return dispatch({ type: LOGIN_FORGOT_FAILURE });
      }

      return dispatch({ type: LOGIN_FORGOT_SUCCESS, email });
    } catch (e) {
      throw e;
    }
  };
}

export function requestUserAuth(form, remember) {
  return async (dispatch) => {
    dispatch({ type: REQUEST_LOGIN });

    try {
      const res = await axios.post('/api/auth', { form, remember });
      const { user, cart } = res.data;

      dispatch({ type: LOGIN_SUCCESS, user, cart });
      // Redirect to
      return dispatch(push('/cabinet'));
    } catch (e) {
      if (e.message === 'Request failed with status code 403') {
        return dispatch({ type: LOGIN_FAILURE, error: 'email' });
      }
      if (e.message === 'Request failed with status code 401') {
        return dispatch({ type: LOGIN_FAILURE, error: 'password' });
      }

      throw e;
    }
  };
}

export function requestUserReg(form) {
  return async (dispatch) => {
    dispatch({ type: REQUEST_REG });

    try {
      const res = await axios.post('/api/users', { form });
      const { user, cart } = res.data;

      dispatch({ type: REG_SUCCESS, user, cart });
      // Redirect to
      return dispatch(push('/login'));
    } catch (e) {
      if (e.message === 'Request failed with status code 403') {
        return dispatch({ type: REG_FAILURE, error: 'email' });
      }
      if (e.message === 'Request failed with status code 401') {
        return dispatch({ type: REG_FAILURE, error: 'password' });
      }

      throw e;
    }
  };
}

export function requestUserEdit(form) {
  return async (dispatch) => {
    dispatch({ type: REQUEST_EDIT });

    try {
      const res = await axios.put('/api/users', { form });
      const { user } = res.data;

      dispatch({ type: EDIT_SUCCESS, user });

      // Redirect to
      return dispatch(push('/cabinet'));
    } catch (e) {
      if (e.message === 'Request failed with status code 403') {
        return dispatch({ type: EDIT_FAILURE, error: 'email' });
      }
      if (e.message === 'Request failed with status code 401') {
        return dispatch({ type: EDIT_FAILURE, error: 'password' });
      }

      throw e;
    }
  };
}

export function requestUserLogout() {
  return async (dispatch) => {
    dispatch({ type: REQUEST_LOGOUT });

    try {
      const res = await axios.delete('/api/auth');
      const cart = res.data;

      dispatch({ type: LOGOUT_SUCCESS, cart });
      // Redirect to
      return dispatch(push('/logout'));
    } catch (e) {
      dispatch({ type: LOGOUT_FAILURE });

      throw e;
    }
  };
}
