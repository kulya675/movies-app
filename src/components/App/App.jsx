/* eslint-disable no-console */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TmdbService from '../../services/TmdbService';
import { GenreProvider } from '../GenreContext';

import Tab from '../Tab';

import './App.scss';

class App extends Component {
  tmdbService = new TmdbService();

  state = {
    currentTab: 'search',
    searchList: [],
    ratedList: [],
    empty: true,
    currentPage: 1,
    searchValue: '',
    responseStatus: {
      loading: false,
      error: false,
    },
  };

  componentDidMount() {
    if (!this.tmdbService.getCookieSessionId()) {
      this.tmdbService.createGuestSession();
    }

    this.getGenresList();

    this.getRatedList();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentTab, currentPage, searchValue } = this.state;
    if (currentPage !== prevState.currentPage) {
      this.getMovies(searchValue, currentPage);
    }

    if (searchValue !== prevState.searchValue) {
      this.onChangeCurrentPage(1);
    }
    if (currentTab !== prevState.currentTab) {
      this.getRatedList();
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
    if (!searchValue) {
      this.setState({ searchList: [], empty: true });
      return;
    }

    this.setState({ responseStatus: { loading: true } });

    this.tmdbService
      .getSearchResults(searchValue, pageCounter)
      .then((moviesList) => {
        const listWRating = moviesList.map(this.getMoviesRating);

        if (moviesList.length === 0) {
          this.setState(() => ({
            searchList: [],
            searchValue,
            empty: true,
            responseStatus: { loading: false },
          }));
          return;
        }

        this.setState({
          searchValue,
          searchList: listWRating,
          empty: false,
          responseStatus: {
            loading: false,
          },
        });
      })
      .catch(this.onError);
  };

  getMoviesRating = (movie) => {
    const { ratedList } = this.state;
    const newMovie = { ...movie };
    ratedList.forEach((ratedMovie) => {
      if (movie.id === ratedMovie.id) {
        newMovie.rating = ratedMovie.rating;
      }
    });
    return newMovie;
  };

  getRatedList = () => {
    this.setState({ responseStatus: { loading: true } });

    this.tmdbService
      .getRatedMovies()
      .then((ratedList) => {
        this.setState(() => {
          return { ratedList, responseStatus: { loading: false } };
        });
      })
      .catch(() => {
        return '';
      });
  };

  getGenresList = () => {
    this.tmdbService.getGenres().then(({ genres }) => {
      this.setState(() => {
        return {
          genres,
        };
      });
    });
  };

  changeRating = (arr, id, value) => {
    const newArr = arr.map((elem) => {
      const newElem = { ...elem };
      if (id === elem.id) {
        newElem.rating = value;
        return newElem;
      }
      return elem;
    });
    return newArr;
  };

  onRateMovie = (movieId, rateValue) => {
    const { searchList, ratedList, currentTab } = this.state;
    if (currentTab === 'search') {
      this.setState(() => {
        return { searchList: this.changeRating(searchList, movieId, rateValue) };
      });
    } else {
      this.setState(() => {
        return { ratedList: this.changeRating(ratedList, movieId, rateValue) };
      });
    }
    this.tmdbService.rateMovie(movieId, rateValue);
  };

  onTabChange = (value) => {
    this.setState({ currentTab: value });
  };

  onChangeCurrentPage = (value) => {
    window.scrollTo(0, 0);
    this.setState(() => {
      return { currentPage: value };
    });
  };

  render() {
    const { currentTab, searchList, ratedList, genres, responseStatus, empty, searchValue, currentPage } = this.state;

    let spinnerStyle;
    if (responseStatus.loading) {
      spinnerStyle = { overflow: 'hidden' };
    }

    const list = currentTab === 'search' ? searchList : ratedList;

    return (
      <section className="app" style={spinnerStyle}>
        <GenreProvider value={genres}>
          <Tab
            list={list}
            responseStatus={responseStatus}
            empty={empty}
            searchValue={searchValue}
            currentPage={currentPage}
            onChangeCurrentPage={this.onChangeCurrentPage}
            getMovies={this.getMovies}
            onTabChange={this.onTabChange}
            currentTab={currentTab}
            onRateMovie={this.onRateMovie}
          />
        </GenreProvider>
      </section>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
