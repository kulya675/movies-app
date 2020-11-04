import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Tag } from 'antd';

import './Card.scss';

const Card = ({ title, overview, release_date: releaseDate, poster_path: posterPath }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  const date = new Date(releaseDate);

  const resultOverview = () => {
    let text = overview;
    let lastSpace = 0;
    const symLimit = 240;

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
          <span className="info__date">{format(date, 'MMMM d, y')}</span>
          <Tag className="info__genre">Action</Tag>
          <Tag className="info__genre">Trash</Tag>
          <p className="info__overview">{resultOverview()}</p>
        </div>
      </div>
    </li>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
};

export default Card;
