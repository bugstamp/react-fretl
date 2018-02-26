import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import HomeTitle from '../../components/HomeTitle';
import ProductsSection from '../../components/ProductsSection';

class Home extends Component {
  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    const { getProductsForHomePage } = this.props;

    getProductsForHomePage(['latest', 'sale']);
  }

  render() {
    const { products } = this.props;

    return (
      <DocumentTitle title="Fretl">
        <div className="home-page">
          <HomeTitle />
          <ProductsSection
            sectionId="latest"
            title="Наши Новинки"
            description="Последние обновления нашего ассортимента"
            products={products.filter(product => product.group === 'latest')}
          />
          <ProductsSection
            sectionId="sale"
            title="Товары по акции:"
            description="Наши сезонные скидки и акции"
            products={products.filter(product => product.group === 'sale')}
          />
        </div>
      </DocumentTitle>
    );
  }
}

Home.defaultProps = {
  products: [],
};

Home.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  getProductsForHomePage: PropTypes.func.isRequired,
};

export default Home;
