import React from 'react';
import PropTypes from 'prop-types';

import SearchInput from '../SearchInput';
import './Header.scss';

const Header = ({ onSearch, searchValue }) => {
  return (
    <header className="header">
      <div className="header__filter">I AM FILTER</div>
      <SearchInput onSearch={onSearch} searchValue={searchValue} />
    </header>
  );
};

Header.defaultProps = {
  onSearch: () => {},
  searchValue: null,
};

Header.propTypes = {
  onSearch: PropTypes.func,
  searchValue: PropTypes.string,
};

export default Header;
