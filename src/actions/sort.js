import { SET_SORT } from '../constants';

export default function setSort(sort) {
  return {
    type: SET_SORT,
    sortingBy: sort,
  };
}
