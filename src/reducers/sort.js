import { SET_SORT } from '../constants';

const sortingBy = (key, order = 'asc') => (a, b) => {
  let comparison = 0;
  let A;
  let B;

  if (key === 'name') {
    A = a[key].toUpperCase();
    B = b[key].toUpperCase();
  }

  if (key === 'price') {
    A = (1000 / a.value) * a.price;
    B = (1000 / b.value) * b.price;
  }

  if (A > B) {
    comparison = 1;
  } else if (A < B) {
    comparison = -1;
  }

  return (order === 'desc') ? (comparison * -1) : comparison;
};

export function getSortedProducts(products, type) {
  switch (type) {
    case 'ABC':
      return products.sort(sortingBy('name', 'asc'));

    case 'UP':
      return products.sort(sortingBy('price', 'asc'));

    case 'DOWN':
      return products.sort(sortingBy('price', 'desc'));

    default:
      return products;
  }
}

export default (state = '', action) => {
  switch (action.type) {
    case SET_SORT:
      return action.sortingBy;

    default:
      return state;
  }
};
