import React from 'react';
import PropTypes from 'prop-types';

function FormButtonClose({ onClick }) {
  return (
    <div className="modal-close-custom">
      <button type="button" onClick={onClick}>
        <span />
        <span />
      </button>
    </div>
  );
}

FormButtonClose.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FormButtonClose;
