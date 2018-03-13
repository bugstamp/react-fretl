import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function Item({ product, increment, decrement, remove }) {
  const price = (product.order * product.price).toFixed(2);
  const value = product.order * product.value;

  return (
    <div className="item">
      <NavLink
        to={`/category/${product.category}/${product.productId}`}
        className="link"
      >
        <div className="image">
          <img src={product.img.small} alt={product.name} />
        </div>
      </NavLink>
      <div className="name">{product.name}</div>
      <div className="value">
        <button
          className="dec update-value"
          onClick={decrement}
          disabled={product.order <= 1}
        >-</button>
        <label htmlFor="cart-value">
          <input
            type="text"
            name="cart-value"
            size={value.toString().length}
            value={value}
            readOnly
          />
        </label>
        {product.unit}
        <button
          className="inc update-value"
          onClick={increment}
        >+</button>
      </div>
      <div className="price">{price} грн</div>
      <button
        className="remove"
        onClick={remove}
      />
    </div>
  );
}

Item.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    img: PropTypes.objectOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    calories: PropTypes.string.isRequired,
    remark: PropTypes.string.isRequired,
    newPrice: PropTypes.number,
  }).isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default Item;
