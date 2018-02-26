import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from './App';

import { checkUserAuth } from '../actions/';

const mapStateToProps = ({ user, shop }) => {
  const { checkingAuth } = user;
  const { loading } = shop;

  return {
    checking: checkingAuth,
    loading,
  };
};

export default withRouter(connect(mapStateToProps, { checkUserAuth })(App));
