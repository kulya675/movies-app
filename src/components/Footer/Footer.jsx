import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import TmdbService from '../../services/TmdbService';

import './Footer.scss';

class Footer extends Component {
  tmdbService = new TmdbService();

  state = {
    totalMovies: 0,
  };

  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    searchValue: PropTypes.string.isRequired,
    onChangeCurrentPage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { searchValue } = this.props;
    this.tmdbService.getTotalResults(searchValue).then((result) => {
      this.setState(() => {
        return { totalMovies: result };
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { searchValue } = this.props;

    if (prevProps.searchValue !== searchValue) {
      this.tmdbService.getTotalResults(searchValue).then((result) => {
        this.setState(() => {
          return { totalMovies: result };
        });
      });
    }
  }

  changeCurrentPage = (page) => {
    const { onChangeCurrentPage } = this.props;
    onChangeCurrentPage(page);
  };

  render() {
    const { currentPage } = this.props;
    const { totalMovies } = this.state;

    return (
      <footer className="footer">
        <Pagination
          className="footer__pagination pagination"
          size="small"
          showSizeChanger={false}
          current={currentPage}
          total={totalMovies}
          defaultPageSize={20}
          onChange={this.changeCurrentPage}
          hideOnSinglePage
        />
      </footer>
    );
  }
}

export default Footer;
