import React from 'react';
import PropTypes from 'prop-types';

function ProductItemButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="button button-buy"
    >
      <i className="icon" />
      {children}
    </button>
  );
}

ProductItemButton.defaultProps = {
  onClick: null,
};

ProductItemButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
};

export default ProductItemButton;
