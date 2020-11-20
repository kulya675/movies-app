/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { Input } from 'antd';

import './SearchInput.scss';

class SearchInput extends Component {
  state = {
    value: '',
  };

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.setState({
      value: this.props.searchValue,
    });
  }

  getMoviesDebounced = debounce((value) => {
    this.props.onSearch(value);
  }, 800);

  onInputSearch = (evt) => {
    this.setState({
      value: evt.target.value,
    });
    this.getMoviesDebounced(evt.target.value);
  };

  render() {
    return (
      <Input
        className="header__search search"
        placeholder="Type to search..."
        value={this.state.value}
        onChange={this.onInputSearch}
      />
    );
  }
}

export default SearchInput;
