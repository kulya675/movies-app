import React from 'react';
import PropTypes from 'prop-types';

import './Rating.scss';

const Rating = ({ voteAverage }) => {
  let borderColor = '';

  if (voteAverage < 3) {
    borderColor = '#E90000';
  } else if (voteAverage < 5) {
    borderColor = '#E97E00';
  } else if (voteAverage < 7) {
    borderColor = '#E9D100';
  } else {
    borderColor = '#66E900';
  }

  const style = { borderColor };
  return (
    <div className="info__rating rating" style={style}>
      <span className="rating__counter">{voteAverage}</span>
    </div>
  );
};

Rating.propTypes = {
  voteAverage: PropTypes.number.isRequired,
};

export default Rating;
