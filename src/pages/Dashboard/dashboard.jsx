import React, { Component } from 'react';
import './dashboard.scss';
import { inject } from 'mobx-react';
import styled from 'styled-components';
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

@inject('routerStore', 'userStore')
class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const { authService } = this.props.userStore;
    this.setState({ user: authService.loadUser() });
  }

  render() {
    const { user } = this.state;
    return user === null ? (
      <Loading />
    ) : (
      <Container className='container-fluid'>
        <Heading>Dashboard</Heading>
        <div className='jumbotron'>
          <div className='text-center'>
            <h2>{user.name}</h2>
            <h4>110823938494</h4>
            <h3>#2000</h3>
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
            <h2 className='mb-3 text-center'>Transaction History</h2>
            <div className='table-responsive'>
              <table className='table table-striped'>
                <thead style={{ backgroundColor: 'black', color: 'white' }}>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Date</th>
                    <th scope='col'>Source</th>
                    <th scope='col'>Recipient</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'>type</th>
                    <th scope='col'>status</th>
                    <th scope='col'>Wallet Balance</th>
                    <th scope='col'>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope='row'>1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope='row'>2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope='row'>3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TnxContainer>
        </div>
      </Container>
    );
  }
}

export default DashboardPage;
