/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

import { GenreConsumer } from '../GenreContext';

import './Genre.scss';

const Genre = ({ genreIds }) => {
  return (
    <GenreConsumer>
      {(genres) => {
        const genreArr = [];
        genreIds.forEach((id) => {
          genres.forEach((elem) => {
            if (id === elem.id) {
              genreArr.push(elem.name);
            }
          });
        });

        const genresContainer = genreArr.map((elem) => {
          return <Tag key={elem}>{elem}</Tag>;
        });

        return <div className="info__genre">{genresContainer}</div>;
      }}
    </GenreConsumer>
  );
};

Genre.propTypes = {
  genreIds: PropTypes.array.isRequired,
};

export default Genre;
