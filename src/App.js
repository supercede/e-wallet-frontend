import React, { Component } from 'react';
import { Route } from 'react-router';
import { inject, observer } from 'mobx-react';
import SignUpPage from './pages/Signup/signup';

class App extends Component {
  render() {
    return <Route exact path='/' component={SignUpPage} />;
  }
}

export default App;
