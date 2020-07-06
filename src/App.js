import React, { Component } from 'react';
import { Route } from 'react-router';
import { inject, observer } from 'mobx-react';
import SignUpPage from './pages/Signup/signup';
import SignInPage from './pages/Signin/signin';
import DashboardPage from './pages/Dashboard/dashboard';
import TransferMoney from './pages/CreateTransaction/transfer-fund';
import FundWallet from './pages/CreateTransaction/fund-wallet';

@inject('routerStore')
@observer
class App extends Component {
  render() {
    return (
      <>
        <Route exact path='/' component={SignUpPage} />
        <Route exact path='/signup' component={SignUpPage} />
        <Route path='/signin/' component={SignInPage} />
        <Route path='/dashboard' component={DashboardPage} />
        <Route path='/transfer' component={TransferMoney} />
        <Route path='/fund-wallet' component={FundWallet} />
      </>
    );
  }
}

export default App;
