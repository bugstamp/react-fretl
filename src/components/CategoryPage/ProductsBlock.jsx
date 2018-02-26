import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TopBar from './TopBar';
import ProductsListCollapse from './ProductsListCollapse';

class ProductsBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    const { title, products } = this.props;
    const { toggle } = this.state;

    return (
      <div className="block">
        <TopBar
          title={title}
          isOpen={toggle}
          onClick={this.handleToggle}
        />
        <ProductsListCollapse
          isOpen={toggle}
          products={products}
        />
      </div>
    );
  }
}

ProductsBlock.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductsBlock;
