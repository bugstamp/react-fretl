import { connect } from 'react-redux';

import Cabinet from '../components/Cabinet';

import { checkUserAuth } from '../../actions/';

function mapStateToProps({ user }) {
  return {
    userData: user.data,
  };
}

export default connect(mapStateToProps, { checkUserAuth })(Cabinet);
