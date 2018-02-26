import { connect } from 'react-redux';

import Category from '../components/Category';

import { getProductsForCategoryPage, setSort } from '../../actions/';
import { getSortedProducts } from '../../reducers/';

function mapStateToProps(state, { match }) {
  const { category } = match.params;
  const { shop, sort } = state;
  const { loading } = shop;

  return ({
    category,
    loading,
    products: getSortedProducts(state),
    sort,
    setSort,
  });
}

export default connect(mapStateToProps, { getProductsForCategoryPage, setSort })(Category);
