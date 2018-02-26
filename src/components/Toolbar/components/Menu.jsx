import React from 'react';
import PropTypes from 'prop-types';

function Menu({ children }) {
  return (
    <div className="menu">
      {children}
    </div>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Menu;
