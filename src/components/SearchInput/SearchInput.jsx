import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { Input } from 'antd';

import './SearchInput.scss';

const SearchInput = ({ onSearch }) => {
  const getMoviesDebounced = debounce((value) => {
    onSearch(value);
  }, 800);

  const onInputSearch = (evt) => {
    getMoviesDebounced(evt.target.value);
  };

  return <Input placeholder="Type to search..." className="header__search search" onChange={onInputSearch} />;
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchInput;
