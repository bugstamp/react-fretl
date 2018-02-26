import React from 'react';
import PropTypes from 'prop-types';

function FormHeader({ text }) {
  return (
    <div className="form-header">
      <h2>{text}</h2>
    </div>
  );
}

FormHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FormHeader;
