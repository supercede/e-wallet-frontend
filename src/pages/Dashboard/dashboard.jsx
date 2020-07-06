import React, { Component } from 'react';
import './dashboard.scss';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import Transactions from '../../components/transactions.component';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { Button } from '@material-ui/core';
import Loading from '../../components/loading.component';

const Heading = styled.h1`
  margin-top: 0;
  text-align: center;
  color: white;
`;

const Container = styled.div`
  background-color: gray;
`;

const TnxContainer = styled.div`
  background-color: #eeeeee;
  margin-bottom: 30px;
`;

@inject('routerStore', 'userStore', 'transactionsStore')
@observer
class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const { authService } = this.props.userStore;
    const { transactionsStore } = this.props;

    transactionsStore.getWallet();

    this.setState({ user: authService.loadUser() });
  }

  render() {
    const { user } = this.state;
    const { transactionsStore } = this.props;

    return user === null ? (
      <Loading />
    ) : (
      <Container className='container-fluid'>
        <Heading>Dashboard</Heading>
        <div className='jumbotron'>
          <div className='text-center'>
            <h2>{user.name}</h2>
            <h4>{transactionsStore.wallet.walletNo}</h4>
            <h3>₦{transactionsStore.wallet.balance}</h3>
            <Button
              style={{ margin: '15px', fontSize: '1em' }}
              variant='contained'
              color='primary'
              // onClick={this.submit}
            >
              Fund Wallet
            </Button>
            <Button
              style={{ margin: '15px', fontSize: '1em' }}
              variant='contained'
              color='primary'
              // onClick={this.submit}
            >
              Transfer Money
            </Button>
          </div>
        </div>
        <div className='container'>
          <TnxContainer>
            <Transactions />
          </TnxContainer>
        </div>
      </Container>
    );
  }
}

export default DashboardPage;
