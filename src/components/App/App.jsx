/* eslint-disable no-console */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TmdbService from '../../services/TmdbService';

import Header from '../Header';
import CardList from '../CardList';
import Footer from '../Footer';

import './App.scss';

class App extends Component {
  tmdbService = new TmdbService();

  state = {
    moviesList: [],
    empty: true,
    currentPage: 1,
    searchValue: null,
    responseStatus: {
      loading: false,
      error: false,
    },
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, searchValue } = this.state;
    if (currentPage !== prevState.currentPage) {
      this.getMovies(searchValue, currentPage);
    }
    if (searchValue !== prevState.searchValue) {
      this.onChangeCurrentPage(1);
    }
  }

  onError = () => {
    this.setState({
      responseStatus: {
        loading: false,
        error: true,
      },
    });
  };

  getMovies = (searchValue, pageCounter) => {
    // const { moviesList: list } = this.state;
    if (!searchValue) {
      this.setState({ moviesList: [], empty: true });
      return;
    }

    this.setState({ responseStatus: { loading: true } });

    this.tmdbService
      .getSearchResults(searchValue, pageCounter)
      .then((moviesList) => {
        if (moviesList.length === 0) {
          console.log(moviesList);
          this.setState(() => ({
            searchValue,
            empty: true,
            responseStatus: { loading: false },
          }));
          return;
        }

        this.setState({
          searchValue,
          moviesList,
          empty: false,
          responseStatus: {
            loading: false,
          },
        });
      })
      .catch(this.onError);
  };

  onChangeCurrentPage = (value) => {
    this.setState(() => {
      return { currentPage: value };
    });
  };

  render() {
    const { moviesList, responseStatus, empty, searchValue, currentPage } = this.state;

    const footer = !empty ? (
      <Footer currentPage={currentPage} searchValue={searchValue} onChangeCurrentPage={this.onChangeCurrentPage} />
    ) : null;

    return (
      <>
        <Header onSearch={this.getMovies} searchValue={searchValue} />
        <CardList moviesList={moviesList} responseStatus={responseStatus} empty={empty} />
        {footer}
      </>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
