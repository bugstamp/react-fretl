import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';

import Navigation from './Navigation';

function DropDownNav({ isOpen }) {
  return (
    <Collapse isOpen={isOpen}>
      <div className="dropdown-nav">
        <Navigation />
      </div>
    </Collapse>
  );
}

DropDownNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default DropDownNav;
