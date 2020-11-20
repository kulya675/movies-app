/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Rating from '../Rating';
import Genre from '../Genre';
import RatingStars from '../RatingStars';

import './Card.scss';
import poster from './poster.svg';

const Card = ({ title, overview, releaseDate, posterPath, voteAverage, genreIds, rating, movieId, onRateMovie }) => {
  let posterUrl = poster;
  let date;

  if (posterPath !== null) {
    posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  try {
    date = format(new Date(releaseDate), 'MMMM d, y');
  } catch {
    date = 'Unknow';
  }

  const textReduction = (target, limit) => {
    let text = target;
    let lastSpace = 0;
    const symLimit = limit;

    if (text.length <= symLimit) return text;

    text = text.slice(0, symLimit);
    lastSpace = text.lastIndexOf(' ');
    text = text.substr(0, lastSpace);

    return `${text} ...`;
  };

  return (
    <li className="list__card card">
      <div className="card__wrapper">
        <div className="card__img">
          <img src={posterUrl} alt={title} />
        </div>
        <div className="card__info info">
          <h5 className="info__title">{textReduction(title, 30)}</h5>
          <Rating voteAverage={voteAverage} />
          <span className="info__date">{date}</span>
          <Genre className="info__genre" genreIds={genreIds} />
          <p className="info__overview">{textReduction(overview, 150)}</p>
          <RatingStars onRateMovie={onRateMovie} movieId={movieId} rating={rating} />
        </div>
      </div>
    </li>
  );
};

Card.defaultProps = {
  releaseDate: undefined,
  posterPath: undefined,
  rating: 0,
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
  posterPath: PropTypes.string,
  voteAverage: PropTypes.number.isRequired,
  genreIds: PropTypes.array.isRequired,
  rating: PropTypes.number,
  movieId: PropTypes.number.isRequired,
  onRateMovie: PropTypes.func.isRequired,
};

export default Card;
