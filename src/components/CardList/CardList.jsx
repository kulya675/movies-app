/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { Spin } from 'antd';

import Card from '../Card';
import EmptyScreen from '../EmptyScreen';
import ErrorScreen from '../ErrorScreen';
import './CardList.scss';

const CardList = ({ moviesList, responseStatus, empty, onRateMovie }) => {
  const { loading, error } = responseStatus;

  const elements = moviesList.map((item) => {
    const { id, title, overview, releaseDate, posterPath, genreIds, voteAverage, rating } = item;

    return (
      <Card
        key={id}
        movieId={id}
        title={title}
        overview={overview}
        releaseDate={releaseDate}
        posterPath={posterPath}
        genreIds={genreIds}
        voteAverage={voteAverage}
        rating={rating}
        onRateMovie={onRateMovie}
      />
    );
  });

  const dataIsHere = !loading || !error;

  const spinner = loading ? <Spin className="list__loader" size="large" /> : null;
  const emptyScreen = !loading && empty ? <EmptyScreen /> : null;
  const errorScreen = error ? <ErrorScreen /> : null;
  const content = dataIsHere ? <ul className="cards__list list">{elements}</ul> : null;

  return (
    <section className="cards__wrapper wrapper">
      {emptyScreen}
      {errorScreen}
      {spinner}
      {content}
    </section>
  );
};

CardList.defaultProps = {
  empty: false,
};

CardList.propTypes = {
  moviesList: PropTypes.array.isRequired,
  responseStatus: PropTypes.object.isRequired,
  empty: PropTypes.bool,
  onRateMovie: PropTypes.func.isRequired,
};

export default CardList;
