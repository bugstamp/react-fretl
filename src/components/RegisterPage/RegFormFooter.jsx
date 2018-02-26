import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';

import SignInLink from '../Toolbar/components/Panel/SignInLink';

function RegFormFooter({ user, requestUserAuth, checkUserLogin }) {
  return (
    <div className="form reg-form">
      <FormGroup className="reg-form-footer">
        <p>У меня есть аккаунт:</p>
        <SignInLink
          user={user}
          requestUserAuth={requestUserAuth}
          checkUserLogin={checkUserLogin}
        />
      </FormGroup>
    </div>
  );
}

RegFormFooter.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  requestUserAuth: PropTypes.func.isRequired,
  checkUserLogin: PropTypes.func.isRequired,
};

export default RegFormFooter;
