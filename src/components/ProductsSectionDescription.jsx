import React from 'react';
import PropTypes from 'prop-types';

function ProductsSectionDescription({ title, description }) {
  return (
    <div className="products-section-description">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

ProductsSectionDescription.defaultProps = {
  description: '',
};

ProductsSectionDescription.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default ProductsSectionDescription;
