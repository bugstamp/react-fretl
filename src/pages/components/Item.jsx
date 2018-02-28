import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import ItemTitle from '../../components/ItemPage/ItemTitle';
import ProductsSection from '../../components/ProductsSection';

import info from '../../utils/info';

const { categoryTopics } = info;

class Item extends Component {
  componentDidMount() {
    const { category, id } = this.props;

    this.getProducts(category, id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.getProducts(nextProps.category, nextProps.id);
    }
  }

  getProducts(category, id) {
    const { getProductsForItemPage } = this.props;

    getProductsForItemPage(category, id);
  }

  render() {
    const { category, products, item, addToCart } = this.props;
    const topic = categoryTopics[category];

    return (
      <DocumentTitle title={item.name || topic.title} >
        <div className="item-page">
          {
            Object.keys(item).length !== 0 ?
              <ItemTitle product={item} buy={addToCart} />
              :
              null
          }
          <ProductsSection
            sectionId="item-products"
            title={`Другие товары по категории ${topic.title}`}
            products={products}
            withButton={false}
          />
        </div>
      </DocumentTitle>
    );
  }
}

Item.defaultProps = {
  products: [],
  item: {},
};

Item.propTypes = {
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.object),
  item: PropTypes.shape({
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
  }),
  getProductsForItemPage: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Item;
