/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { Spin } from 'antd';

import Card from '../Card';
import EmptyScreen from '../EmptyScreen';
import ErrorScreen from '../ErrorScreen';
import './CardList.scss';

const CardList = ({ moviesList, responseStatus, empty }) => {
  const { loading, error } = responseStatus;

  const elements = moviesList.map((item) => {
    const { id } = item;
    return <Card key={id} {...item} />;
  });

  const dataIsHere = !loading || !error;

  const spinner = loading ? <Spin className="list__loader" size="large" /> : null;
  const emptyScreen = empty ? <EmptyScreen /> : null;
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

CardList.propTypes = {
  moviesList: PropTypes.array.isRequired,
  responseStatus: PropTypes.object.isRequired,
  empty: PropTypes.bool.isRequired,
};

export default CardList;
