import React from 'react';
import PropTypes from 'prop-types';

import SignInLink from './SignInLink';
import PanelLinks from './PanelLinks';

function UserPanel({ user, requestUserAuth, requestUserLogout, checkUserLogin }) {
  return (
    !user.logging.success ?
      <SignInLink
        user={user}
        requestUserAuth={requestUserAuth}
        checkUserLogin={checkUserLogin}
      />
      :
      <PanelLinks
        user={user}
        requestUserLogout={requestUserLogout}
      />
  );
}

UserPanel.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  requestUserAuth: PropTypes.func.isRequired,
  requestUserLogout: PropTypes.func.isRequired,
  checkUserLogin: PropTypes.func.isRequired,
};

export default UserPanel;
