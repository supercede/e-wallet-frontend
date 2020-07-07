import React, { Component } from 'react';
import { Button, InputAdornment } from '@material-ui/core';
import { inject } from 'mobx-react';

import ErrorMessage from '../../components/error.component';
import { convertErrorObjToArr } from '../../shared/utils/utils';
import { FormContainer, FormField, Heading } from '../../shared/styles/styles';
import '../Signup/signup.scss';

@inject('transactionsStore', 'routerStore')
class TransferMoney extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      narration: '',
      recipient: '',
      errorMessage: '',
    };
  }

  handlePay = async () => {
    const { amount, narration, recipient } = this.state;
    const { transactionsStore, routerStore } = this.props;

    try {
      await transactionsStore.transferFunds(amount, narration, recipient);
      routerStore.push('/dashboard');
    } catch (error) {
      let errObj;

      if (error.response.status === 400) {
        if (error.response.data.error?.message === 'validation error') {
          errObj = convertErrorObjToArr(error.response.data.error.errors);
        } else {
          errObj = error.response.data.message;
        }
      } else {
        errObj = error.response.data.error.message;
      }

      const errorMessage = errObj;
      this.setState({ errorMessage });
    }
  };

  goToDashboard = () => {
    this.props.routerStore.push('/dashboard');
  };

  render() {
    const { errorMessage, recipient, amount, narration } = this.state;
    return (
      <div className='fullscreen-wrapper'>
        <FormContainer ref='form' onSubmit={this.handlePay}>
          <Heading>Crentech Wallets</Heading>
          <p>Fill the fields below carefully to transfer money to friends.</p>

          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <FormField
              className='outlined-name'
              label="Recipient's Wallet Number"
              margin='dense'
              value={recipient}
              variant='outlined'
              onChange={(e) => this.setState({ recipient: e.target.value })}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </div>

          <div>
            <FormField
              className='outlined-name'
              label='amount'
              margin='dense'
              type='number'
              value={amount}
              variant='outlined'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>₦</InputAdornment>
                ),
              }}
              onChange={(e) => this.setState({ amount: e.target.value })}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </div>
          <div>
            <FormField
              className='outlined-name'
              label='narration'
              margin='dense'
              variant='outlined'
              value={narration}
              onChange={(e) => this.setState({ narration: e.target.value })}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <div style={{ marginTop: '10px' }}>
              <Button
                fullWidth
                variant='contained'
                size='large'
                color='primary'
                type='submit'
                style={{ fontSize: '1em' }}
              >
                TRANSFER
              </Button>
            </div>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default TransferMoney;
