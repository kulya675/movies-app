import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Genre from '../Genre';
import './Card.scss';
import poster from './poster.svg';

const Card = ({ title, overview, releaseDate, posterPath }) => {
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

  const resultOverview = () => {
    let text = overview;
    let lastSpace = 0;
    const symLimit = 210;

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
          <h5 className="info__title">{title}</h5>
          <span className="info__date">{date}</span>
          <Genre className="info__genre" />
          <p className="info__overview">{resultOverview()}</p>
        </div>
      </div>
    </li>
  );
};

Card.defaultProps = {
  releaseDate: undefined,
  posterPath: undefined,
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
  posterPath: PropTypes.string,
};

export default Card;
