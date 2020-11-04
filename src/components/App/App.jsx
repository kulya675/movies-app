import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import CardList from '../CardList';

import './App.scss';

class App extends Component {
  state = {};

  render() {
    return (
      <section className="cards__wrapper wrapper">
        <CardList />
      </section>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
