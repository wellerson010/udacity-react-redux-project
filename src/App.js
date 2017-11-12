import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import HomePage from './views/pages/home-page';

class App extends Component {
    render() {

    return (
      <div>
        <Route exact path="/" component={HomePage} />
      </div>
    );
  }
}

export default App;