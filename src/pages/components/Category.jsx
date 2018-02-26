import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import CategoryTitle from '../../components/CategoryPage/CategoryTitle';
import CategoryProductsSection from '../../components/CategoryPage/CategoryProductsSection';

import info from '../../utils/info';

class Category extends Component {
  componentDidMount() {
    const { category } = this.props;

    this.getProducts(category);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== this.props.category) {
      this.getProducts(nextProps.category);
    }
  }

  getProducts(category) {
    const { getProductsForCategoryPage } = this.props;

    getProductsForCategoryPage(category);
  }

  render() {
    const { products, category, sort, setSort } = this.props;
    const topic = info.categoryTopics[category];

    return (
      <DocumentTitle title={topic.title}>
        <div className="category-page">
          <CategoryTitle
            topic={topic}
            sort={sort}
            setSort={setSort}
          />
          <CategoryProductsSection
            title={topic.title}
            products={products}
          />
        </div>
      </DocumentTitle>
    );
  }
}

Category.defaultProps = {
  products: [],
};

Category.propTypes = {
  category: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.object),
  getProductsForCategoryPage: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
};

export default Category;
