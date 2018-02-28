import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import ProductButton from './ProductButton';

class Product extends Component {
  constructor(props) {
    super(props);

    const { price, value } = this.props.product;

    this.state = {
      price: price.toFixed(2),
      value,
      order: 1,
    };

    this.updateInput = this.updateInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateValue = this.validateValue.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.addtoCart = this.addtoCart.bind(this);
  }

  // Reset state
  componentWillReceiveProps(nextProps) {
    const { price, value } = nextProps.product;

    this.setState({
      price: price.toFixed(2),
      value,
      order: 1,
    });
  }

  getOrder(action) {
    let { order } = this.state;

    if (action.type === 'inc') {
      order += 1;
    } else if (action.type === 'dec' && order > 1) {
      order += -1;
    } else if (action.type === 'set') {
      order = action.order;
    }

    return order;
  }

  validateValue() {
    const { value: defValue } = this.props.product;
    const { value: currentValue } = this.state;

    if (currentValue < defValue) {
      return defValue;
    }
    return (currentValue / defValue).toFixed(0) * defValue;
  }

  handleChange(e) {
    const { value } = e.target;

    this.setState({ value });
  }

  updateInput(action) {
    const { price, value } = this.props.product;
    const order = this.getOrder(action);

    this.setState({
      price: (order * price).toFixed(2),
      value: order * value,
      order,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { value: defValue } = this.props.product;
    const value = this.validateValue();

    this.updateInput({
      type: 'set',
      order: value / defValue,
    });
  }

  addtoCart() {
    const { product, buy } = this.props;
    const { order } = this.state;

    buy(product.productId, order);
  }

  render() {
    const { product } = this.props;
    const { price, value } = this.state;
    const inputSize = value.toString().length;

    return (
      <div className="product-wrapper">
        <div className="product">
          <NavLink
            to={`/category/${product.category}/${product.productId}`}
            className="product-link"
          >
            {product.group === 'latest' ?
              <div className="label">New!</div>
              :
              null}
            <img src={product.img.middle} alt={product.name} />
          </NavLink>
          <div className="name">{product.name}</div>
          <div className="price"> {`${price} грн`}
            {product.group === 'sale' ?
              <div className="price-old">{`${product.oldPrice.toFixed(2)}грн`}</div>
              :
              null}
          </div>
          <div className="value">
            <button
              className="dec update-value"
              onClick={() => this.updateInput({ type: 'dec' })}
            >
            -
            </button>
            <div className="input">
              <label htmlFor="product-value">
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    name="product-value"
                    value={value}
                    onChange={this.handleChange}
                    onBlur={this.handleSubmit}
                    size={inputSize}
                    maxLength="5"
                  />
                </form>
              </label>
              {product.unit}
            </div>
            <button
              className="inc update-value"
              onClick={() => this.updateInput({ type: 'inc' })}
            >
            +
            </button>
          </div>
          <ProductButton onClick={this.addtoCart}>Добавить в корзину</ProductButton>
          <NavLink
            to={`/category/${product.category}/${product.productId}`}
            className="link-read-more"
          >
            Подробнее о товаре
          </NavLink>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    productId: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    value: PropTypes.number,
    unit: PropTypes.string,
    img: PropTypes.objectOf(PropTypes.string),
    description: PropTypes.string,
    calories: PropTypes.string,
    remark: PropTypes.string,
    newPrice: PropTypes.number,
  }).isRequired,
  buy: PropTypes.func.isRequired,
};

export default Product;
