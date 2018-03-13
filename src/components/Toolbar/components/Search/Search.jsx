import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchList from './SearchList';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    const { getSearchItems } = this.props;

    this.setState({ name: value });

    getSearchItems(value);
  }

  render() {
    const { items } = this.props;

    return (
      <div className="search">
        <div className="search-input">
          <i className="icon" />
          <input
            type="text"
            placeholder="Поиск по товарам"
            ref={(input) => { this.name = input; }}
            onChange={this.handleChange}
          />
        </div>
        <SearchList
          isOpen={items.length !== 0}
          items={items}
        />
      </div>
    );
  }
}

Search.defaultProps = {
  items: [],
};

Search.propTypes = {
  getSearchItems: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
};

export default Search;
