import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CartButton from './CartButton';
import CartList from './CartList';

class Cart extends Component {
  componentDidMount() {
    const { getCart } = this.props;

    getCart();
  }

  getTotalSum() {
    const { cart } = this.props;
    const sum = cart.items.reduce((result, item) => {
      const price = item.order * item.price;

      return result + price;
    }, 0);

    return cart.items.length === 0 ? 0 : Number(sum).toFixed(2);
  }

  render() {
    const {
      increment,
      decrement,
      remove,
      checkout,
      cart,
      isOpen,
      toggle,
    } = this.props;
    const totalSum = this.getTotalSum();
    const quantity = cart.items.length;

    return (
      <div className="cart">
        <CartButton
          quantity={quantity}
          toggle={toggle}
        />
        <CartList
          isOpen={isOpen}
          items={cart.items}
          increment={id => increment(id)}
          decrement={id => decrement(id)}
          remove={id => remove(id)}
          checkout={checkout}
          totalSum={totalSum}
        />
      </div>
    );
  }
}

Cart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
  cart: PropTypes.shape({
    loading: PropTypes.objectOf(PropTypes.bool),
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Cart;
