import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';

import './RatingStars.scss';

const RatingStars = ({ onRateMovie, movieId, rating }) => {
  const onRate = (value) => {
    onRateMovie(movieId, value);
  };
  return <Rate className="rating__stars" count="10" value={rating} onChange={onRate} allowHalf />;
};

RatingStars.propTypes = {
  movieId: PropTypes.number.isRequired,
  onRateMovie: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
};

export default RatingStars;
