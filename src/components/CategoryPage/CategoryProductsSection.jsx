import React from 'react';
import PropTypes from 'prop-types';

import ProductsBlock from './ProductsBlock';

function CategoryProductsSection(props) {
  const { title, products } = props;

  return (
    <section id="category-products">
      <ProductsBlock
        title={`${title} на развес`}
        products={products.filter(product => product.unit === 'г')}
      />
      <ProductsBlock
        title={`${title} поштучно`}
        products={products.filter(product => product.unit === 'шт')}
      />
    </section>
  );
}

CategoryProductsSection.defaultProps = {
  products: [],
};

CategoryProductsSection.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.object),
};

export default CategoryProductsSection;
