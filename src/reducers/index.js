import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import shop, * as fromShop from './shop';
import cart from './cart';
import sort, * as fromSort from './sort';
import search from './search';

export default combineReducers({
  user,
  shop,
  cart,
  sort,
  search,
  routing: routerReducer,
});

export function getSortedProducts(state) {
  return fromSort.getSortedProducts(state.shop.products, state.sort);
}

export function shuffleProducts(state) {
  return fromShop.shuffleProducts(state.shop.products, state.shop.item.productId);
}
