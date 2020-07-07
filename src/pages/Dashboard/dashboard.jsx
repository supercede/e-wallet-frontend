import React, { Component } from 'react';
import './dashboard.scss';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import { Button, IconButton } from '@material-ui/core';
import Transactions from '../../components/transactions.component';
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
  padding: 10px;
`;

const SignOutIconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-left: 10px;

  .signOutIcon {
    fill: black;
    font-size: 2em;
  }
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

  handleSignOut = () => {
    const { userStore, transactionsStore, routerStore } = this.props;
    userStore.signout();
    transactionsStore.resetTransactions();
    routerStore.push('/signin');
  };

  goToTransfer = () => {
    this.props.routerStore.push('/transfer');
  };

  goToFundWallet = () => {
    this.props.routerStore.push('/fund-wallet');
  };

  render() {
    const { user } = this.state;
    const { transactionsStore } = this.props;

    return user === null ? (
      <Loading />
    ) : (
      <Container className='container-fluid'>
        <Heading>Dashboard</Heading>
        <SignOutIconContainer className='float-right'>
          <IconButton onClick={this.handleSignOut}>
            <SignOutIcon className='signOutIcon' />
          </IconButton>
        </SignOutIconContainer>
        <div className='jumbotron'>
          <div className='text-center'>
            <h2>{user.name}</h2>
            <h4>Wallet No: {transactionsStore.wallet.walletNo}</h4>
            <h3>₦{transactionsStore.wallet.balance}</h3>
            <Button
              style={{ margin: '15px', fontSize: '1em' }}
              variant='contained'
              color='primary'
              onClick={this.goToFundWallet}
            >
              Fund Wallet
            </Button>
            <Button
              style={{ margin: '15px', fontSize: '1em' }}
              variant='contained'
              color='primary'
              onClick={this.goToTransfer}
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
