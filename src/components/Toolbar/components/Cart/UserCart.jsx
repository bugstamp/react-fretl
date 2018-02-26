import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Cart from './Cart';
import CartButton from './CartButton';

class UserCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.toggle = this.toggle.bind(this);
    this.getTotalSum = this.getTotalSum.bind(this);
  }

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

  toggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { open } = this.state;
    const {
      increment,
      decrement,
      remove,
      checkout,
      cart,
    } = this.props;
    const totalSum = this.getTotalSum();
    const quantity = cart.items.length;

    return (
      <div className="shopping-cart">
        <CartButton
          quantity={quantity}
          toggle={this.toggle}
        />
        <Cart
          isOpen={open}
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

UserCart.propTypes = {
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

export default UserCart;
