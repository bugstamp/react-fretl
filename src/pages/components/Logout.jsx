import React from 'react';
import DocumentTitle from 'react-document-title';

import LogoutTitle from '../../components/LogoutPage/LogoutTitle';
import LogoutSection from '../../components/LogoutPage/LogoutSection';

function Logout() {
  return (
    <DocumentTitle title="Выход">
      <div className="logout-page">
        <LogoutTitle />
        <LogoutSection />
      </div>
    </DocumentTitle>
  );
}

export default Logout;
