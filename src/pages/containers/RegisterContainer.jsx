import { connect } from 'react-redux';

import Register from '../components/Register';

import {
  requestUserAuth,
  requestUserReg,
  checkUserLogin,
} from '../../actions/';

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps, {
  requestUserAuth,
  requestUserReg,
  checkUserLogin,
})(Register);
