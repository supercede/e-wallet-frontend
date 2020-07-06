import React, { Component } from 'react';
import { Route } from 'react-router';
import { inject, observer } from 'mobx-react';
import SignUpPage from './pages/Signup/signup';
import SignInPage from './pages/Signin/signin';

@inject('routerStore')
@observer
class App extends Component {
  render() {
    return (
      <>
        <Route exact path='/' component={SignUpPage} />
        <Route exact path='/signup' component={SignUpPage} />
        <Route path='/signin/' component={SignInPage} />
      </>
    );
  }
}

export default App;
