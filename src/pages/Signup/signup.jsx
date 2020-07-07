import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { inject } from 'mobx-react';

import { FormContainer, FormField, Heading } from '../../shared/styles/styles';
import ErrorMessage from '../../components/error.component';
import { convertErrorObjToArr } from '../../shared/utils/utils';
import './signup.scss';

@inject('routerStore', 'userStore')
class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errorMessage: null,
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      const { password } = this.state;
      if (value !== password) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule('passwordLength', (value) => {
      return value.length > 7;
    });
  }

  goToSignIn = () => {
    this.props.routerStore.push('/signin');
  };

  submit = async () => {
    const { name, email, password, passwordConfirm } = this.state;

    try {
      await this.props.userStore.signup(name, email, password, passwordConfirm);
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

  render() {
    const { errorMessage, name, email, password, passwordConfirm } = this.state;

    return (
      <div className='fullscreen-wrapper'>
        <FormContainer ref='form' onSubmit={this.submit}>
          <Heading>Crentech Wallets</Heading>
          <p>
            Share fund easily with friends and family, Create an account now.
          </p>

          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <FormField
              className='outlined-name'
              label='name'
              margin='dense'
              value={name}
              variant='outlined'
              onChange={(e) => this.setState({ name: e.target.value })}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </div>

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
          <div>
            <FormField
              className='outlined-name'
              label='Confirm Password'
              margin='dense'
              variant='outlined'
              value={passwordConfirm}
              onChange={(e) =>
                this.setState({ passwordConfirm: e.target.value })
              }
              type='password'
              validators={['isPasswordMatch', 'required']}
              errorMessages={['password mismatch', 'this field is required']}
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
              SIGN UP
            </Button>
            <Button fullWidth onClick={this.goToSignIn}>
              Sign in instead?
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default SignUpPage;
