import React from 'react';
import PropTypes from 'prop-types';

function RightMenu({ children }) {
  return (
    <div className="right-menu">
      {children}
    </div>
  );
}

RightMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RightMenu;
