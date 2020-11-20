/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { SearchOutlined, StarOutlined } from '@ant-design/icons';

import MoviesList from '../MoviesList';

import './Tab.scss';

const { TabPane } = Tabs;

export class Tab extends Component {
  state = {};

  static propTypes = {
    list: PropTypes.array.isRequired,
    responseStatus: PropTypes.object.isRequired,
    empty: PropTypes.bool.isRequired,
    searchValue: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    onChangeCurrentPage: PropTypes.func.isRequired,
    getMovies: PropTypes.func.isRequired,
    onTabChange: PropTypes.func.isRequired,
    currentTab: PropTypes.string.isRequired,
    onRateMovie: PropTypes.func.isRequired,
  };

  render() {
    const {
      list,
      responseStatus,
      empty,
      searchValue,
      currentPage,
      onChangeCurrentPage,
      getMovies,
      onTabChange,
      currentTab,
      onRateMovie,
    } = this.props;

    const moviesList = (
      <MoviesList
        list={list}
        responseStatus={responseStatus}
        empty={empty}
        searchValue={searchValue}
        currentPage={currentPage}
        onChangeCurrentPage={onChangeCurrentPage}
        getMovies={getMovies}
        currentTab={currentTab}
        onRateMovie={onRateMovie}
      />
    );

    return (
      <Tabs className="tabs" defaultActiveKey="search" onChange={onTabChange}>
        <TabPane
          tab={
            <span>
              <SearchOutlined />
              Search
            </span>
          }
          key="search"
        >
          {moviesList}
        </TabPane>
        <TabPane
          tab={
            <span>
              <StarOutlined />
              Rated
            </span>
          }
          key="rated"
        >
          {moviesList}
        </TabPane>
      </Tabs>
    );
  }
}

export default Tab;
