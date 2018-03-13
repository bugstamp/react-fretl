import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function SearchList({ items, isOpen }) {
  return (
    <div className={`dropdown ${isOpen ? ' is-open' : ''}`}>
      <ul className="search-list">
        {items.length !== 0 ?
          items.map((item, index) => (
            <li className="item" key={index}>
              <NavLink to={`/category/${item.category}/${item.productId}`}>
                {item.name}
              </NavLink>
            </li>),
          )
          :
          null
        }
      </ul>
    </div>
  );
}

SearchList.defaultProps = {
  items: [],
};

SearchList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
};

export default SearchList;
