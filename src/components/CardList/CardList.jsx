import React, { Component } from 'react';

import TmdbService from '../../services/TmdbService';

import Card from '../Card';
import './CardList.scss';

class CardList extends Component {
  tmdbService = new TmdbService();

  constructor() {
    super();
    this.getMovies();
  }

  state = {
    moviesList: [],
  };

  getMovies() {
    this.tmdbService.getSearchResults('return').then((movies) => {
      this.setState({
        moviesList: movies,
      });
    });
  }

  render() {
    const { moviesList } = this.state;
    const elements = moviesList.map((item) => {
      const { id } = item;
      return <Card key={id} {...item} />;
    });
    return <ul className="cards__list list">{elements}</ul>;
  }
}

export default CardList;
