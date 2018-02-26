import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import RegFormLayout from '../../components/RegisterPage/RegFormLayout';

function Register({ user, requestUserAuth, requestUserReg, checkUserLogin }) {
  return (
    <DocumentTitle title="Регистрация">
      <div className="register-page">
        <RegFormLayout
          user={user}
          requestUserReg={requestUserReg}
          requestUserAuth={requestUserAuth}
          checkUserLogin={checkUserLogin}
        />
      </div>
    </DocumentTitle>
  );
}

Register.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  requestUserAuth: PropTypes.func.isRequired,
  requestUserReg: PropTypes.func.isRequired,
  checkUserLogin: PropTypes.func.isRequired,
};

export default Register;
