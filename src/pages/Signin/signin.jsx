import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import styled from 'styled-components';
import { inject } from 'mobx-react';

import './signin.scss';
import ErrorMessage from '../../components/error.component';

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

@inject('routerStore', 'userStore')
class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

  componentDidMount() {
    ValidatorForm.addValidationRule('passwordLength', (value) => {
      return value.length > 7;
    });
  }

  submit = async () => {
    const { email, password } = this.state;

    try {
      await this.props.userStore.signin(email, password);
    } catch (error) {
      console.log(error);

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

  goToSignUp = () => {
    this.props.routerStore.push('/signup');
  };

  render() {
    const { email, password, errorMessage } = this.state;

    return (
      <div className='fullscreen-wrapper'>
        <FormContainer ref='form' onSubmit={this.submit}>
          <Heading>Crentech Wallets</Heading>
          <p>
            Hello, Sign in to your account to continue using Crentech Wallets
          </p>

          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <FormField
              className='outlined-name'
              label='email'
              margin='dense'
              value={email}
              variant='outlined'
              onChange={(e) => this.setState({ email: e.target.value })}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />
          </div>
          <div>
            <FormField
              className='outlined-name'
              label='Password'
              margin='dense'
              variant='outlined'
              value={password}
              helperText='Should be at least 8 letters'
              type='password'
              onChange={(e) => this.setState({ password: e.target.value })}
              validators={['required', 'passwordLength']}
              errorMessages={[
                'this field is required',
                'Password should be at least 8 characters',
              ]}
            />
          </div>
          <hr />
          <div>
            <Button
              style={{ marginBottom: '10px' }}
              fullWidth
              variant='contained'
              color='primary'
              onClick={this.submit}
            >
              SIGN IN
            </Button>
            <Button fullWidth onClick={this.goToSignUp}>
              Don't have an account? Sign up now!
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default SignInPage;
