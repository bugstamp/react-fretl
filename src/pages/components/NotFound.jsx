import React from 'react';
import DocumentTitle from 'react-document-title';

import NotFoundTitle from '../../components/NotFoundPage/NotFoundTitle';

function NotFound() {
  return (
    <DocumentTitle title="404">
      <div className="notfound-page">
        <NotFoundTitle />
      </div>
    </DocumentTitle>
  );
}

export default NotFound;
