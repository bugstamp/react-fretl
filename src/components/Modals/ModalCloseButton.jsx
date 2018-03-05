import React from 'react';
import PropTypes from 'prop-types';

function ModalCloseButton({ onClick }) {
  return (
    <div className="modal-close-custom">
      <button onClick={onClick}>
        <span />
        <span />
      </button>
    </div>
  );
}

ModalCloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalCloseButton;
