import { connect } from 'react-redux';

import ProfileEdit from '../components/ProfileEdit';

import { requestUserEdit, checkUserAuth } from '../../actions/';

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps, {
  requestUserEdit,
  checkUserAuth,
})(ProfileEdit);
