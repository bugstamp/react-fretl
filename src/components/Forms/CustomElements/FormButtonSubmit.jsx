import React from 'react';
import PropTypes from 'prop-types';

function FormButtonSubmit({ checking, text }) {
  return (
    <button className="button form-button-submit">
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

FormButtonSubmit.propTypes = {
  checking: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default FormButtonSubmit;
