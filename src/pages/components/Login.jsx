import React from 'react';
import DocumentTitle from 'react-document-title';

import LoginTitle from '../../components/LoginPage/LoginTitle';
import LoginSection from '../../components/LoginPage/LoginSection';

function Login() {
  return (
    <DocumentTitle title="Вход">
      <div className="login-page">
        <LoginTitle />
        <LoginSection />
      </div>
    </DocumentTitle>
  );
}

export default Login;
