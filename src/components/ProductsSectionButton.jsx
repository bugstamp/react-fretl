import React from 'react';
import PropTypes from 'prop-types';

function ProductsSectionButton({ show, isOpen, onClick }) {
  const text = !isOpen ? 'Смотреть все' : 'Свернуть';

  return (
    show ?
      <div className="button-else">
        <button onClick={onClick}>{text}</button>
      </div>
      :
      null
  );
}

ProductsSectionButton.propTypes = {
  show: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProductsSectionButton;
