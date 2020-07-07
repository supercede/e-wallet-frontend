import React, { Component } from 'react';
import { Button, InputAdornment } from '@material-ui/core';
import { inject } from 'mobx-react';
import { convertErrorObjToArr } from '../../shared/utils/utils';
import { FormContainer, FormField, Heading } from '../../shared/styles/styles';
import ErrorMessage from '../../components/error.component';
import '../Signup/signup.scss';

@inject('transactionsStore', 'routerStore')
class FundWallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      errorMessage: null,
    };
  }

  handleFunding = async () => {
    const { amount } = this.state;
    const { transactionsStore } = this.props;

    try {
      await transactionsStore.fundWallet(amount);
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

  render() {
    const { errorMessage, amount } = this.state;
    return (
      <div className='fullscreen-wrapper'>
        <FormContainer ref='form' onSubmit={this.handleFunding}>
          <Heading>Crentech Wallets</Heading>
          <p>
            Fund your e-wallet effortlessly. Enter a valid amount to get started
          </p>

          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <FormField
              className='outlined-name'
              label='amount'
              margin='dense'
              type='number'
              value={amount}
              variant='outlined'
              size='medium'
              InputProps={{
                startAdornment: <InputAdornment position="start">₦</InputAdornment>,
              }}
              onChange={(e) => this.setState({ amount: e.target.value })}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <Button fullWidth variant='contained' size="large" color='primary' type='submit' style={{fontSize: '1em'}}>
              PAY
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default FundWallet;
