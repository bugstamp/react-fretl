import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Product from './Product';

import { addToCart } from '../actions/';

function ProductsList({ products, buy }) {
  return (
    <div className="products-list">
      {products.map((product, index) => (
        <Product
          key={index}
          product={product}
          buy={(id, order) => buy(id, order)}
        />),
      )}
    </div>
  );
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  buy: PropTypes.func.isRequired,
};

export default connect(null, { buy: addToCart })(ProductsList);
