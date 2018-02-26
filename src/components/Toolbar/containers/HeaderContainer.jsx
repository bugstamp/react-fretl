import { connect } from 'react-redux';

import Header from '../components/Header';

import {
  getSearchItems,
  getCart,
  increment,
  decrement,
  remove,
  checkout,
  requestUserAuth,
  requestUserLogout,
  checkUserLogin,
} from '../../../actions/';

function mapStateToProps({ cart, search, user }) {
  return {
    search,
    cart,
    user,
  };
}

export default connect(mapStateToProps, {
  getSearchItems,
  getCart,
  increment,
  decrement,
  remove,
  checkout,
  requestUserAuth,
  requestUserLogout,
  checkUserLogin,
})(Header);
