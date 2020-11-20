/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import CardList from '../CardList';
import Footer from '../Footer';
import './MoviesList.scss';

const MoviesList = ({
  list,
  responseStatus,
  empty,
  searchValue,
  currentPage,
  onChangeCurrentPage,
  getMovies,
  currentTab,
  onRateMovie,
}) => {
  const search = currentTab === 'search';

  const currentCardList = search ? (
    <CardList moviesList={list} responseStatus={responseStatus} empty={empty} onRateMovie={onRateMovie} />
  ) : (
    <CardList moviesList={list} responseStatus={responseStatus} onRateMovie={onRateMovie} />
  );

  const footer =
    !empty && search ? (
      <Footer currentPage={currentPage} searchValue={searchValue} onChangeCurrentPage={onChangeCurrentPage} />
    ) : null;

  const header = search ? <Header onSearch={getMovies} searchValue={searchValue} /> : null;

  return (
    <>
      {header}
      {currentCardList}
      {footer}
    </>
  );
};

MoviesList.propTypes = {
  list: PropTypes.array.isRequired,
  responseStatus: PropTypes.object.isRequired,
  empty: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangeCurrentPage: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
  onRateMovie: PropTypes.func.isRequired,
};

export default MoviesList;
