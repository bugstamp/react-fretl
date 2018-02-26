import { connect } from 'react-redux';

import Home from '../components/Home';

import { getProductsForHomePage } from '../../actions/';

function mapStateToProps({ shop }) {
  const { loading, products } = shop;

  return ({
    loading,
    products,
  });
}

export default connect(mapStateToProps, { getProductsForHomePage })(Home);
