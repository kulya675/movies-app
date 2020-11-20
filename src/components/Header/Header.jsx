import React from 'react';
import PropTypes from 'prop-types';

import SearchInput from '../SearchInput';
import './Header.scss';

const Header = ({ onSearch, searchValue }) => {
  return (
    <header className="header">
      <SearchInput onSearch={onSearch} searchValue={searchValue} />
    </header>
  );
};

Header.defaultProps = {
  onSearch: () => {},
  searchValue: '',
};

Header.propTypes = {
  onSearch: PropTypes.func,
  searchValue: PropTypes.string,
};

export default Header;
