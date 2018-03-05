import React from 'react';
import PropTypes from 'prop-types';

function FormButtonSubmit({ checking, text, className }) {
  return (
    <button
      type="submit"
      className={`button form-button-submit ${className}`}
    >
      {checking ?
        <i
          className="icon-loading fa fa-spinner fa-pulse fa-3x fa-fw"
          aria-hidden="true"
        />
        :
        text
      }
    </button>
  );
}

FormButtonSubmit.defaultProps = {
  className: '',
};

FormButtonSubmit.propTypes = {
  checking: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default FormButtonSubmit;
