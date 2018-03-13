import React from 'react';
import PropTypes from 'prop-types';

function NavButton({ toggle, isOpen }) {
  return (
    <button
      className={`nav-button${isOpen ? ' is-on' : ''}`}
      onClick={toggle}
    >
      <div className="line top" />
      <div className="line middle" />
      <div className="line bottom" />
    </button>
  );
}

NavButton.defaultProps = {
  toggle: null,
  isOpen: false,
};

NavButton.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default NavButton;
