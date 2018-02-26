import { connect } from 'react-redux';

import Item from '../components/Item';

import { getProductsForItemPage, addToCart } from '../../actions/';

function mapStateToProps({ shop }, { match }) {
  const { category, id } = match.params;
  const { loading, products, item } = shop;

  return ({
    category,
    id,
    loading,
    products,
    item,
  });
}

export default connect(mapStateToProps, { getProductsForItemPage, addToCart })(Item);
