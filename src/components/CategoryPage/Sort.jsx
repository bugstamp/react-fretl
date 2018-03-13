import React from 'react';
import PropTypes from 'prop-types';

import SortButton from './SortButton';

function Sort({ sort, setSort }) {
  return (
    <div className="sort">
      <div className="title">Сортировка товаров:</div>

      <SortButton
        active={sort === 'ABC'}
        className="abc"
        onClick={() => setSort('ABC')}
      >По алфавиту</SortButton>
      <SortButton
        active={sort === 'UP'}
        className="up"
        onClick={() => setSort('UP')}
      >По цене
        <i className="icon" />
      </SortButton>
      <SortButton
        active={sort === 'DOWN'}
        className="down"
        onClick={() => setSort('DOWN')}
      >По цене
        <i className="icon" />
      </SortButton>
    </div>
  );
}

Sort.propTypes = {
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
};

export default Sort;
