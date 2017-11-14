import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import './App.css';
import HomePage from './views/pages/home-page';
import NewPost from './views/components/new-post';

class App extends Component {
    render() {

    return (
      <div className='container'>
        <Route exact path="/" render={() => (
          <Redirect to="/category/all" />
        )}/>

        <Route path="/category/:category" component={HomePage}/>

        <Route path="/post/new/:category?" component={NewPost} />
      </div>
    );
  }
}

export default App;