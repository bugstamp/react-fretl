import React from 'react';
import PropTypes from 'prop-types';

function Phone({ children, phone }) {
  return (
    <div className="phone">
      <i className="icon" />
      <a href={`tel:${phone}`}>{ phone }</a>
      {children}
    </div>
  );
}

Phone.defaultProps = {
  children: null,
};

Phone.propTypes = {
  children: PropTypes.node,
  phone: PropTypes.string.isRequired,
};

export default Phone;
