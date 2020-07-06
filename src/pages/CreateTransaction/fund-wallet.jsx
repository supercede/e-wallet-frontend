import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { inject } from 'mobx-react';
import ErrorMessage from '../../components/error.component';
import '../Signup/signup.scss';

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled(ValidatorForm)`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextValidator)`
  width: 100%;
`;

@inject('transactionsStore', 'routerStore')
class FundWallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      errorMessage: null,
    };
  }

  convertErrorObjToArr = (errObj) => {
    const err = [];
    for (let prop in errObj) {
      const message = `${prop}: ${errObj[prop]}`;
      err.push(message);
    }
    return err;
  };

  handleFunding = async () => {
    const { amount } = this.state;
    const { transactionsStore } = this.props;

    try {
      console.log(amount);
      await transactionsStore.fundWallet(amount);

      // await this.props.userStore.signup(name, email, password, passwordConfirm);
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
              onChange={(e) => this.setState({ amount: e.target.value })}
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

export default FundWallet;
