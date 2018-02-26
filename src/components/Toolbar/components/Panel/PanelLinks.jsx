import React from 'react';
import PropTypes from 'prop-types';

import LogoutLink from './LogoutLink';
import CabinetLink from './CabinetLink';

function PanelLinks({ requestUserLogout }) {
  return (
    <div className="user-panel-links">
      <CabinetLink />
      <LogoutLink requestUserLogout={requestUserLogout} />
    </div>
  );
}

PanelLinks.propTypes = {
  requestUserLogout: PropTypes.func.isRequired,
};

export default PanelLinks;
