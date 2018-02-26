import React from 'react';
import PropTypes from 'prop-types';

function FormInvalidFeedback({ active, text }) {
  return (
    active ?
      <div className="form-invalid-feedback">{text}</div>
      :
      null
  );
}

FormInvalidFeedback.defaultProps = {
  active: false,
  text: '',
};

FormInvalidFeedback.propTypes = {
  active: PropTypes.bool,
  text: PropTypes.string,
};

export default FormInvalidFeedback;
