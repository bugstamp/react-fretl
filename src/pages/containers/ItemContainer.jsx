import { connect } from 'react-redux';

import Item from '../components/Item';

import { getProductsForItemPage, addToCart } from '../../actions';

function mapStateToProps(state, { match }) {
  const { category, id } = match.params;
  const { loading, products, item } = state.shop;

  return ({
    category,
    id,
    loading,
    products,
    item,
  });
}

export default connect(mapStateToProps, { getProductsForItemPage, addToCart })(Item);
