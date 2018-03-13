import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import RegFormSection from '../../components/RegisterPage/RegFormSection';

function Register({ user, requestUserAuth, requestUserReg, checkUserLogin }) {
  return (
    <DocumentTitle title="Регистрация">
      <div className="register-page">
        <div className="top" />
        <RegFormSection
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
