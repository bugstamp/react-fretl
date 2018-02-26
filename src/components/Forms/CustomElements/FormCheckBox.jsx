import React from 'react';
import PropTypes from 'prop-types';

function FormCheckBox({ active }) {
  return (
    active ?
      <div className="check-box-custom" />
      :
      null
  );
}

FormCheckBox.defaultProps = {
  active: false,
};

FormCheckBox.propTypes = {
  active: PropTypes.bool,
};

export default FormCheckBox;
