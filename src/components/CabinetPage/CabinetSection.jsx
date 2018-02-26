import React from 'react';
import PropTypes from 'prop-types';

import Profile from './Profile';

function CabinetSection({ userData }) {
  return (
    <section id="cabinet-section">
      <div className="top" />
      <Profile userData={userData} />
    </section>
  );
}

CabinetSection.defaultProps = {
  userData: {},
};

CabinetSection.propTypes = {
  userData: PropTypes.objectOf(PropTypes.string),
};

export default CabinetSection;
