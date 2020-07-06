import React from 'react';
import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UserStore from './stores/user.store';
import AuthService from './services/auth.service';
import TransactionService from './services/transaction.service';
import TransactionStore from './stores/transaction.store';

const services = {};
const stores = {};

stores.routerStore = new RouterStore();
services.authService = new AuthService();
services.transactionsService = new TransactionService(stores.routerStore);

stores.userStore = new UserStore(services.authService);
stores.transactionsStore = new TransactionStore(services.transactionsService);

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, stores.routerStore);

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
