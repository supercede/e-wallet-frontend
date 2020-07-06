import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { inject } from 'mobx-react';
import '../Signup/signup.scss';
import ErrorMessage from '../../components/error.component';

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled(ValidatorForm)`
  max-width: 500px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextValidator)`
  width: 100%;
`;

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
      console.log({ amount, narration, recipient });

      await transactionsStore.transferFunds(amount, narration, recipient);
      routerStore.push('/dashboard');
    } catch (error) {
      let errObj;

      if (error.response.status === 400) {
        if (error.response.data.error?.message === 'validation error') {
          errObj = this.convertErrorObjToArr(error.response.data.error.errors);
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

  convertErrorObjToArr = (errObj) => {
    const err = [];
    for (let prop in errObj) {
      const message = `${prop}: ${errObj[prop]}`;
      err.push(message);
    }
    return err;
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
              label='recipient'
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
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              // onClick={this.submit}
            >
              PAY
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default TransferMoney;
