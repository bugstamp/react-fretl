import React from 'react';
import PropTypes from 'prop-types';

function SortButton({ active, children, className, onClick, ...rest }) {
  return (
    <button
      className={`${active ? `${className} is-active` : className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

SortButton.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SortButton;
