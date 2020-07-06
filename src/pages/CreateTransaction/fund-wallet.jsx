import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { inject } from 'mobx-react';
import ErrorMessage from '../../components/ErrorMessage';

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
class CreateTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: null,
      narration: '',
      recipient: '',
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

  handlePay = async () => {
    const { amount, narration, recipient } = this.state;

    try {
      // await this.props.userStore.signup(name, email, password, passwordConfirm);
    } catch (error) {
      let errObj;

      if (error.response.status === 400) {
        errObj = this.convertErrorObjToArr(error.response.data.error.errors);
      } else {
        errObj = error.response.data.error.message;
      }

      const errorMessage = errObj;
      this.setState({ errorMessage });
    }
  };

  render() {
    const { errorMessage, recipient, amount, narration } = this.state;
    return (
      <FormContainer ref='form' onSubmit={this.submit}>
        <Heading>Crentech Wallets</Heading>
        <p>Share fund easily with friends and family, Create an account now.</p>

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
    );
  }
}

export default CreateTransaction;
