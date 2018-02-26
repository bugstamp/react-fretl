import React from 'react';
import PropTypes from 'prop-types';

function CartButton({ toggle, quantity }) {
  let text;

  if (quantity === 1) {
    text = 'товар';
  } else if (quantity > 1 && quantity < 5) {
    text = 'товара';
  } else {
    text = 'товаров';
  }

  return (
    <button onClick={toggle} className="cart-button">
      <i className="icon-cart" />
      <span className="number">{quantity} </span>
      <span className="text">{text}</span>
    </button>
  );
}

CartButton.propTypes = {
  quantity: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default CartButton;
