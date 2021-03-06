import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { inject } from 'mobx-react';

import { FormContainer, FormField, Heading } from '../../shared/styles/styles';
import ErrorMessage from '../../components/error.component';
import { convertErrorObjToArr } from '../../shared/utils/utils';
import './signin.scss';

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

  componentDidMount() {
    ValidatorForm.addValidationRule('passwordLength', (value) => {
      return value.length > 7;
    });
  }

  submit = async () => {
    const { email, password } = this.state;

    try {
      await this.props.userStore.signin(email, password);
      this.props.routerStore.push('/dashboard');
    } catch (error) {
      let errObj;

      if (error.response.status === 400) {
        errObj = convertErrorObjToArr(error.response.data.error.errors);
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
              type='password'
              onChange={(e) => this.setState({ password: e.target.value })}
              validators={['required', 'passwordLength']}
              errorMessages={[
                'this field is required',
                'Password should be at least 8 characters',
              ]}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <Button
              fullWidth
              variant='contained'
              size='large'
              color='primary'
              type='submit'
              style={{ fontSize: '0.8em' }}
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
