import { connect } from 'react-redux';

import FixedHeader from '../components/FixedHeader';

import {
  getCart,
  increment,
  decrement,
  remove,
  checkout,
} from '../../../actions/';

function mapStateToProps({ cart }) {
  return {
    cart,
  };
}

export default connect(mapStateToProps, {
  getCart,
  increment,
  decrement,
  remove,
  checkout,
})(FixedHeader);
